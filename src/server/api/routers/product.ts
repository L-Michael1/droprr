import { scrapeProduct } from "~/server/helpers/scrape";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;

      const product = await ctx.db.product.findFirst({
        where: { id: input.id, userId },
      });

      return product;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    console.log("HELLO")
    const userId = ctx.session?.user?.id;

    const products = await ctx.db.product.findMany({
      where: { userId },
      orderBy: [{ createdAt: "asc" }],
    });

    return products;
  }),

  create: protectedProcedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session?.user?.id;

        // Check if product already exists for user
        const existingProduct = await ctx.db.product.findFirst({
          where: { userId, url: input.url },
        });

        if (existingProduct) {
          throw new Error("Product already being tracked");
        }

        const scrapedProduct = await scrapeProduct(input.url);

        const product = await ctx.db.product.create({
          data: {
            userId,
            url: scrapedProduct.url,
            image: scrapedProduct.image,
            name: scrapedProduct.name,
            currentPrice: scrapedProduct.currentPrice,
            originalPrice: scrapedProduct.originalPrice,
            lowestPrice: scrapedProduct.lowestPrice,
            highestPrice: scrapedProduct.highestPrice,
            averagePrice: scrapedProduct.averagePrice,
            isOutOfStock: scrapedProduct.isOutOfStock,
            currency: scrapedProduct.currency,
            priceHistory: {
              create: [
                {
                  price: scrapedProduct.currentPrice,
                },
              ],
            },
          },
        });

        console.log(product);

        return product;
      } catch (error) {
        throw error;
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session?.user?.id;

        // Check if product is being tracked by the user
        const trackedProduct = await ctx.db.product.findFirst({
          where: { userId, id: input.id },
        });

        // Product not being tracked
        if (!trackedProduct) {
          throw new Error("Product is not being tracked");
        }

        await ctx.db.product.delete({
          where: { id: input.id },
        });

        return true;
      } catch (error) {
        throw error;
      }
    }),
});

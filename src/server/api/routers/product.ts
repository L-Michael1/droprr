import { scrapeProduct } from "~/server/helpers/scrape";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
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
});

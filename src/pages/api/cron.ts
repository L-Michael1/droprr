import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import {
  getAveragePrice,
  getHighestPrice,
  getLowestPrice,
  scrapeProduct,
} from "~/server/helpers/scrape";
import { generateEmailBody, sendEmail } from "~/utils/nodemailer";

type ResponseData = {
  message: string;
  updatedProducts: { id: string; url: string; currentPrice: number }[] | [];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    // const { data: products } = db.product.getAll.useQuery();
    const products = await db.product.findMany({
      orderBy: [{ createdAt: "asc" }],
      select: {
        id: true,
        url: true,
        currentPrice: true,
      },
    });

    if (!products) {
      throw new Error("No products to check");
    }

    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        const scrapedProduct = await scrapeProduct(product.url);

        // This adds a new price to the price history
        await db.product.update({
          where: { id: product.id },
          data: {
            priceHistory: {
              create: [
                {
                  price: scrapedProduct.currentPrice,
                },
              ],
            },
          },
        });

        // Get the price history
        const priceHistory = await db.priceHistory.findMany({
          where: { productId: product.id },
        });

        // Update the product
        const updatedProduct = await db.product.update({
          where: { id: product.id },
          data: {
            url: scrapedProduct.url,
            image: scrapedProduct.image,
            name: scrapedProduct.name,
            currentPrice: scrapedProduct.currentPrice,
            originalPrice: scrapedProduct.originalPrice,
            lowestPrice: getLowestPrice(priceHistory),
            highestPrice: getHighestPrice(priceHistory),
            averagePrice: getAveragePrice(priceHistory),
            isOutOfStock: scrapedProduct.isOutOfStock,
            currency: scrapedProduct.currency,
          },
        });

        // Get user's email
        const user = await db.user.findUnique({
          where: { id: updatedProduct.userId },
        });

        // Send email if price has dropped
        if (updatedProduct.currentPrice < product.currentPrice) {
          const productInfo = {
            title: updatedProduct.name,
            url: updatedProduct.url,
          };

          if (user?.email) {
            const emailContent = generateEmailBody(productInfo, "PRICE_DROP");
            sendEmail(emailContent, user.email);
          }
        }

        return product;
      }),
    );
    res.status(200).json({ message: "Hello from Next.js!", updatedProducts });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to update products", updatedProducts: [] });
  }
}

import axios from "axios";
import * as cheerio from "cheerio";

const isAmazonUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    return (
      hostname === "www.amazon.com" ||
      hostname.includes("amazon.com") ||
      hostname === "www.amazon.ca" ||
      hostname.includes("amazon.ca") ||
      hostname.endsWith("amazon")
    );
  } catch (err) {
    return false;
  }
};

export function extractPrice(...elements: cheerio.Cheerio<cheerio.Element>[]) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, "");

      let firstPrice;

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      }

      return firstPrice ?? cleanPrice;
    }
  }

  return "";
}

export const scrapeProduct = async (productUrl: string) => {
  try {
    if (!isAmazonUrl(productUrl)) {
      throw new Error("Only Amazon URLs are supported");
    }

    // Scraper API proxy configuration
    const api_key = process.env.SCRAPER_API_KEY;
    const scraperApiUrl = `http://api.scraperapi.com?api_key=${api_key}&url=${productUrl}`;

    const response = await axios.get<string>(scraperApiUrl);
    const $ = cheerio.load(response.data);

    // Extract product information
    const name = $("#productTitle").text().trim();

    // TODO: extracting price is a bit messy, need to refactor
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price"),
    );

    const images =
      $("#landingImage").attr("data-a-dynamic-image") ??
      $("#imgBlkFront").attr("data-a-dynamic-image") ??
      "{}";

    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    const currency = $("span.a-price-symbol").text().trim().slice(0, 1);

    const imageUrls: string[] = Object.keys(
      JSON.parse(images) as Record<string, string>,
    );

    const data = {
      url: productUrl,
      name,
      image: imageUrls[0]!,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
      priceHistory: [],
      isOutOfStock: outOfStock,
      currency,
    };

    return data;
  } catch (error) {
    throw error;
  }
};
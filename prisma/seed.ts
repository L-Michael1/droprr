import { db } from "~/server/db";

async function main() {
  console.log("Cleaning up tables...");
  await db.product.deleteMany();
  await db.user.deleteMany();

  console.log("Seeding User table...");
  await db.user.create({
    data: {
      id: "1",
      name: "John Doe",
      email: "johndoe@gmail.com",
    },
  });

  console.log("Seeding Product table...");
  await db.product.create({
    data: {
      id: "1",
      userId: "1",
      url: "https://www.amazon.com",
      image: "image",
      name: "Test Product",
      currentPrice: 100,
      originalPrice: 150,
      lowestPrice: 50,
      highestPrice: 200,
      averagePrice: 125,
      isOutOfStock: false,
      currency: "$",
      priceHistory: {
        create: [
          {
            price: 100,
          },
        ],
      },
      createdAt: new Date().toISOString(),
    },
  });

  console.log("Seeding finished! 🚀");
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });

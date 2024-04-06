const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function seedProducts() {
  try {

    await prisma.products.create({
      data: {
        title: "canlenton coin",
        description: "This currency is worth 1 USD. It can be used to buy and sell Tokens. You can get more by selling Tokens or by converting USD to Calenton Coins. You can also convert Calenton Coins to USD.",
        url: "https://picsum.photos/id/28",
        price: 2500 // EG: 25.00
      },
    });

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
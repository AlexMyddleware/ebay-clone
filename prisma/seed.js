const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function seedProducts() {
  try {

    await prisma.products.create({
      data: {
        title: "Carbon Token",
        description: "This token is meant to be used for carbon credit.",
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
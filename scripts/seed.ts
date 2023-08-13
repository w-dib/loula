const { PrismaClient } = require("@prisma/client");

const prismadb = new PrismaClient();

async function main() {
  try {
    await prismadb.category.createMany({
      data: [
        { name: "Bills" },
        { name: "Groceries" },
        { name: "Entertainment" },
        { name: "Transportation" },
        { name: "Personal Care" },
        { name: "Miscellaneous" },
      ],
    });
  } catch (err) {
    console.error("Error seeding default categories", err);
  } finally {
    await prismadb.$disconnect();
  }
}

main();

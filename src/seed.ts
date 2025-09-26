import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Populando o banco de dados...");

  // Criar categorias //
  const alimentos = await prisma.category.create({
    data: { name: "Alimentos" },
  });

  const eletronicos = await prisma.category.create({
    data: { name: "Eletrônicos" },
  });

  const limpeza = await prisma.category.create({
    data: { name: "Limpeza" },
  });

  // Criar produtos //
  const arroz = await prisma.product.create({
    data: {
      name: "Arroz Branco",
      sku: "SKU-001",
      categoryId: alimentos.id,
      stock: {
        create: { quantity: 100 },
      },
    },
    include: { stock: true },
  });

  const feijao = await prisma.product.create({
    data: {
      name: "Feijão Preto",
      sku: "SKU-002",
      categoryId: alimentos.id,
      stock: {
        create: { quantity: 50 },
      },
    },
    include: { stock: true },
  });

  const celular = await prisma.product.create({
    data: {
      name: "Celular XYZ",
      sku: "SKU-003",
      categoryId: eletronicos.id,
      stock: {
        create: { quantity: 10 },
      },
    },
    include: { stock: true },
  });

  const sabao = await prisma.product.create({
    data: {
      name: "Sabão em pó",
      sku: "SKU-004",
      categoryId: limpeza.id,
      stock: {
        create: { quantity: 200 },
      },
    },
    include: { stock: true },
  });

  // Movimentações iniciais //
  await prisma.movement.createMany({
    data: [
      { stockId: arroz.id, quantity: 100, type: "IN" },
      { stockId: feijao.id, quantity: 50, type: "IN" },
      { stockId: celular.id, quantity: 10, type: "IN" },
      { stockId: sabao.id, quantity: 200, type: "IN"},
    ],
  });

  console.log("✅ Seed concluída!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
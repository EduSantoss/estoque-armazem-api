import { prisma } from "../prismaClient";

export class MovementRepository {
  async create(stockId: number, type: "IN" | "OUT", quantity: number) {
    return prisma.movement.create({
      data: { stockId, type, quantity }
    });
  }

   async findByProduct(productId: number) {
    return prisma.movement.findMany({
      where: { stock: {productId} },
      orderBy: { createdAt: "desc" },
      include: { stock: { include: { product: true } } },
    });
  }

  async findAll() {
    return prisma.movement.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
}

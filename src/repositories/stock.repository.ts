import { prisma } from "../prismaClient";

export class StockRepository {
  async create(productId: number) {
    return prisma.stock.create({ data: { productId, quantity: 0 } });
  }

  async findByProductId(productId: number) {
    return prisma.stock.findUnique({
      where: { productId },
      include: { movements: true }
    });
  }

  async updateQuantity(productId: number, newQuantity: number) {
    return prisma.stock.update({ where: { id: productId }, data: { quantity: newQuantity } });
  }

  async findAll() {
    return prisma.stock.findMany({ include: { product: true, movements: true } });
  }
}

import { prisma } from "../prismaClient";

export class ProductRepository {
  async create(data: { name: string; sku: string; categoryId: number }) {
    return prisma.product.create({
      data: data,
      include: { category: true },
    });
  }

  async findAll() {
    return prisma.product.findMany({
      include: { category: true, stock: true },
    });
  }

  async findById(id: number) {
    return prisma.product.findUnique({
      where: { id },
      include: { category: true, stock: true },
    });
  }

  async findBySku(sku: string) {
    return prisma.product.findUnique({ where: { sku } });
  }

  async findByCategoryId(categoryId: number) {
    return prisma.product.findMany({
      where: { categoryId },
      include: { stock: true, category: true },
    });
  }

  async update(
    id: number,
    data: { name?: string; sku?: string; categoryId?: number }
  ) {
    return prisma.product.update({
      where: { id },
      data,
      include: { category: true, stock: true },
    });
  }

  async delete(id: number) {
    return prisma.product.delete({ where: { id } });
  }
}

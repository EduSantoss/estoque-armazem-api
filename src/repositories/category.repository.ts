import { prisma } from "../prismaClient";

export class CategoryRepository {
  async create(name: string) {
    return prisma.category.create({ data: { name } });
  }

  async findAll() {
    return prisma.category.findMany({ include: { products: true } });
  }

  async findById(id: number) {
    return prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  async findByName(name: string) {
    return prisma.category.findUnique({ where: { name } });
  }
  
  async update(id: number, name: string) {
    return prisma.category.update({ where: { id }, data: { name } });
  }

  async delete(id: number) {
    return prisma.category.delete({ where: { id } });
  }
}

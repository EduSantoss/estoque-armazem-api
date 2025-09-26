import { CategoryRepository } from "../repositories/category.repository";
import { ProductRepository } from "../repositories/product.repository";

export class CategoryService {
  private categoryRepo = new CategoryRepository();
  private productRepo = new ProductRepository();

  async createCategory(name: string) {
    const exists = await this.categoryRepo.findByName(name);
    if (exists) throw new Error("Categoria já existe.");

    return this.categoryRepo.create(name);
  }

  async getAllCategories() {
    return this.categoryRepo.findAll();
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new Error("Categoria não encontrada.");
    return category;
  }

  async updateCategory(id: number, name: string) {
    return this.categoryRepo.update(id, name);
  }

  async deleteCategory(id: number) {
    const products = await this.productRepo.findByCategoryId(id);
    if (products.length > 0) {
      throw new Error(
        "Não é possível excluir categoria com produtos vinculados."
      );
    }
    return this.categoryRepo.delete(id);
  }
}

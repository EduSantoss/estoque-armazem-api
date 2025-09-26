import { ProductRepository } from "../repositories/product.repository";
import { CategoryRepository } from "../repositories/category.repository";
import { StockRepository } from "../repositories/stock.repository";

export class ProductService {
  private productRepo = new ProductRepository();
  private categoryRepo = new CategoryRepository();
  private stockRepo = new StockRepository();

  async createProduct(data: { name: string; sku: string; categoryId: number }) {
    const exists = await this.productRepo.findBySku(data.sku);
    if (exists) throw new Error("SKU já existe.");

    const category = await this.categoryRepo.findById(data.categoryId);
    if (!category) throw new Error("Categoria inválida.");

    const product = await this.productRepo.create(data);

    // Aqui irá criar registro de estoque inicial = 0 //
    await this.stockRepo.create(product.id);

    return product;
  }

  async getAllProducts() {
    return this.productRepo.findAll();
  }

  async getProductById(id: number) {
    const product = await this.productRepo.findById(id);
    if (!product) throw new Error("Produto não encontrado.");
    return product;
  }

  async updateProduct(id: number, data: { name?: string; sku?: string }) {
    return this.productRepo.update(id, data);
  }

  async deleteProduct(id: number) {
    // exclusão automática de estoque junto com produto
    await this.stockRepo.findByProductId(id);
    return this.productRepo.delete(id);
  }
}

import { StockRepository } from "../repositories/stock.repository";
import { MovementRepository } from "../repositories/movement.repository";
import { ProductRepository } from "../repositories/product.repository";

export class StockService {
  private stockRepo = new StockRepository();
  private movementRepo = new MovementRepository();
  private productRepo = new ProductRepository();

  async listAllStocks() {
    return this.stockRepo.findAll();
  }

  async getStockByProduct(productId: number) {
    const stock = await this.stockRepo.findByProductId(productId);
    if (!stock) throw new Error("Estoque não encontrado para este produto.");
    return stock;
  }

  async registerEntry(productId: number, quantity: number) {
    const product = await this.productRepo.findById(productId);
    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    const stock = await this.stockRepo.findByProductId(productId);
    if (!stock) {
      throw new Error("Estoque para este produto não encontrado.");
    }

    const updatedStock = await this.stockRepo.updateQuantity(
      productId,
      stock.quantity + quantity
    );

    // registra movimentação de entrada //
    await this.movementRepo.create(productId, "IN", quantity);

    return updatedStock;
  }

  async registerExit(productId: number, quantity: number) {
    if (quantity <= 0) throw new Error("Quantidade inválida.");

    const product = await this.productRepo.findById(productId);
    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    const stock = await this.stockRepo.findByProductId(productId);
    if (!stock) {
      throw new Error("Estoque para este produto não encontrado.");
    }

    if (stock.quantity < quantity) {
      throw new Error("Estoque insuficiente para realizar a saída.");
    }

    const updatedStock = await this.stockRepo.updateQuantity(
      productId,
      stock.quantity - quantity
    );

    // registra movimentação de saída //
    await this.movementRepo.create(productId, "OUT", quantity);

    return updatedStock;
  }

  async getHistory(productId: number) {
    const product = await this.productRepo.findById(productId);
    if (!product) {
      throw new Error("Produto não encontrado.");
    }
    return this.movementRepo.findByProduct(productId);
  }
}

import { FastifyReply, FastifyRequest } from "fastify";
import { StockService } from "../services/stock.service";

const stockService = new StockService();

export class StockController {

  static async listAll(req: FastifyRequest, reply: FastifyReply) {
    try {
      const stocks = await stockService.listAllStocks();
      return reply.code(200).send(stocks);
    } catch (err: any) {
      return reply.code(500).send({ error: err.message });
    }
  }

  static async getByProduct(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = req.params as { productId: string };
      const stock = await stockService.getStockByProduct(Number(productId));
      return reply.code(200).send(stock);
    } catch (err: any) {
      // se a mensagem indicar não encontrado, retorna 404 //
      const code = /não encontrado|not found/i.test(err.message) ? 404 : 400;
      return reply.code(code).send({ error: err.message });
    }
  }

  static async registerEntry(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = req.params as { productId: string };
      const { quantity } = req.body as { quantity: number };

      if (typeof quantity !== "number" || quantity <= 0) {
        return reply.code(400).send({ error: "Quantidade inválida (deve ser número > 0)." });
      }

      const updatedStock = await stockService.registerEntry(Number(productId), quantity);
      return reply.code(201).send(updatedStock);
    } catch (err: any) {
      return reply.code(400).send({ error: err.message });
    }
  }

  static async registerExit(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = req.params as { productId: string };
      const { quantity } = req.body as { quantity: number };

      if (typeof quantity !== "number" || quantity <= 0) {
        return reply.code(400).send({ error: "Quantidade inválida (deve ser número > 0)." });
      }

      const updatedStock = await stockService.registerExit(Number(productId), quantity);
      return reply.code(201).send(updatedStock);
    } catch (err: any) {
      // se estoque insuficiente -> 400, se não encontrado -> 404 //
      const code = /insuficiente/i.test(err.message) ? 400 : /não encontrado|not found/i.test(err.message) ? 404 : 400;
      return reply.code(code).send({ error: err.message });
    }
  }

  static async getHistory(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = req.params as { productId: string };
      const history = await stockService.getHistory(Number(productId));
      return reply.code(200).send(history);
    } catch (err: any) {
      const code = /não encontrado|not found/i.test(err.message) ? 404 : 400;
      return reply.code(code).send({ error: err.message });
    }
  }
}

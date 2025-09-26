import { FastifyReply, FastifyRequest } from "fastify";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export class ProductController {
  static async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { data } = req.body as { data: { name: string; sku: string; categoryId: number } };
      const product = await productService.createProduct(data);
      return reply.code(201).send(product);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  }

  static async findAll(req: FastifyRequest, reply: FastifyReply) {
    const product = await productService.getAllProducts();
    return reply.send(product);
  }

  static async findById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };
      const product = await productService.getProductById(Number(id));
      return reply.send(product);
    } catch (error: any) {
      return reply.code(404).send({ error: error.message });
    }
  }

  static async update(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };
      const { data } = req.body as { data: { name: string; sku: string } };
      const updated = await productService.updateProduct(Number(id), data);
      return reply.send(updated);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  }

  static async delete(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };
      await productService.deleteProduct(Number(id));
      return reply.code(204).send();
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  }
}
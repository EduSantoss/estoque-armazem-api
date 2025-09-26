import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService();

export class CategoryController {
  static async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { name } = req.body as { name: string };
      const category = await categoryService.createCategory(name);
      return reply.code(201).send(category);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  }

  static async findAll(req: FastifyRequest, reply: FastifyReply) {
    const categories = await categoryService.getAllCategories();
    return reply.send(categories);
  }

  static async findById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };
      const category = await categoryService.getCategoryById(Number(id));
      return reply.send(category);
    } catch (error: any) {
      return reply.code(404).send({ error: error.message });
    }
  }

  static async update(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };
      const { name } = req.body as { name: string };
      const updated = await categoryService.updateCategory(Number(id), name);
      return reply.send(updated);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  }

  static async delete(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };
      await categoryService.deleteCategory(Number(id));
      return reply.code(204).send();
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  }
}

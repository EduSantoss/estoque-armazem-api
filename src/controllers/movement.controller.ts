import { FastifyReply, FastifyRequest } from "fastify";
import { MovementRepository } from "../repositories/movement.repository";

const movementRepo = new MovementRepository();

export class MovementController {
  static async findAll(req: FastifyRequest, reply: FastifyReply) {
    const movements = await movementRepo.findAll();
    return reply.send(movements);
  }

  static async findByProduct(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { productId } = req.params as { productId: string };
      const movements = await movementRepo.findByProduct(Number(productId));
      return reply.send(movements);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  }
}

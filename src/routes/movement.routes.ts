import { FastifyInstance } from "fastify";
import { MovementController } from "../controllers/movement.controller";

export async function movementRoutes(app: FastifyInstance) {
  app.get("/movements", MovementController.findAll);
  app.get("/movements/:productId", MovementController.findByProduct);
}

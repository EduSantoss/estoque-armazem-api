import { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/category.controller";

export async function categoryRoutes(app: FastifyInstance) {
  app.post("/categories", CategoryController.create);
  app.get("/categories", CategoryController.findAll);
  app.get("/categories/:id", CategoryController.findById);
  app.put("/categories/:id", CategoryController.update);
  app.delete("/categories/:id", CategoryController.delete);
}

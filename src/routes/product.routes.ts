import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/product.controller";

export async function productRoutes(app: FastifyInstance) {
  app.post("/product", ProductController.create);
  app.get("/product", ProductController.findAll);
  app.get("/product/:id", ProductController.findById);
  app.put("/product/:id", ProductController.update);
  app.delete("/product/:id", ProductController.delete);
}
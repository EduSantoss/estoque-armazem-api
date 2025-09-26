import { FastifyInstance } from "fastify";
import { StockController } from "../controllers/stock.controller";

export async function stockRoutes(app: FastifyInstance) {
  app.get("/stocks", StockController.listAll);
  app.get("/stocks/:productId", StockController.getByProduct);
  app.post("/stocks/:productId/in", StockController.registerEntry);
  app.post("/stocks/:productId/out", StockController.registerExit);
  app.get("/stocks/:productId/movements", StockController.getHistory);
}

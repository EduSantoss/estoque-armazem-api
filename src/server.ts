import Fastify from "fastify";
import { stockRoutes } from "./routes/stock.routes";
import { categoryRoutes } from "./routes/category.routes";
import { movementRoutes } from "./routes/movement.routes";
import { productRoutes } from "./routes/product.routes";

const app = Fastify({ logger: true });

// rotas //
app.register(stockRoutes);
app.register(categoryRoutes);
app.register(movementRoutes);
app.register(productRoutes);

// checando funcionamento //
app.get("/", async () => {
  return { message: "API do armazém rodando 🚀" };
});

// Iniciar servidor // 
app.listen({ port: 3000 }).then(() => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});

import "reflect-metadata";

import express, { type NextFunction, type Request, type Response } from "express";
import { AppDataSource } from "./shared/infra/database/AppSource";
import { userRoutes } from "./modules/users/routes/user-routes";
import { gameRoutes } from "./modules/catalog/routes/game-routes";
import { planRoutes } from "./modules/subscriptions/routes/plan-routes";
import { subscriptionRoutes } from "./modules/subscriptions/routes/subscription-routes";
import { categoryRoutes } from "./modules/catalog/routes/category-routes";
import { developerRoutes } from "./modules/catalog/routes/developer-routes";
import { gameSessionRoutes } from "./modules/gameplay/routes/game-session-routes";

const app = express();
const PORT = 3000;

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.error(error);

  return response.status(500).json({
    message: "Internal server error",
  });
}

app.use(userRoutes)
app.use(developerRoutes)
app.use(categoryRoutes)
app.use(gameRoutes)
app.use(gameSessionRoutes)
app.use(planRoutes)
app.use(subscriptionRoutes)
app.use(errorHandler)

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado!");

    app.listen(3000, () => {
      console.log("Servidor rodando");
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar:", error);
  });

app.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`));


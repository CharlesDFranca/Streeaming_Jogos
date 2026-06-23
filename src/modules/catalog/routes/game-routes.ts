import { Router } from "express";

import { GameController } from "../controllers/GameController";
import { TypeOrmGameRepository } from "../infra/repositories/GameRepository";
import { CreateGameUseCase } from "../app/use-cases/games/CreateGameUseCase";
import { GetGameByIdUseCase } from "../app/use-cases/games/GetGameByIdUseCase";
import { ListGamesUseCase } from "../app/use-cases/games/ListGamesUseCase";

const repository = new TypeOrmGameRepository();

const gameController = new GameController(
    new CreateGameUseCase(repository),
    new GetGameByIdUseCase(repository),
    new ListGamesUseCase(repository)
);

const router = Router();

router.post("/games", gameController.create.bind(gameController));

router.get("/games", gameController.list.bind(gameController));

router.get("/games/:id", gameController.getById.bind(gameController));

export { router as gameRoutes };

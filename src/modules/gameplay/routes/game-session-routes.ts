import { Router } from "express";

import { GameSessionController } from "../controllers/GameSessionController";
import { TypeOrmGameSessionRepository } from "../infra/repositories/GameSessionRepository";
import { CreateGameSessionUseCase } from "../app/use-case/gamesession/CreateGameSessionUseCase";
import { GetGameSessionByIdUseCase } from "../app/use-case/gamesession/GetGameSessionByIdUseCase";
import { GetUserGameSessionsUseCase } from "../app/use-case/gamesession/GetUserGameSessionsUseCase";
import { UpdateGameSessionUseCase } from "../app/use-case/gamesession/UpdateGameSessionUseCase";

const repository = new TypeOrmGameSessionRepository();

const gameSessionController = new GameSessionController(
    new CreateGameSessionUseCase(repository),
    new GetGameSessionByIdUseCase(repository),
    new GetUserGameSessionsUseCase(repository),
    new UpdateGameSessionUseCase(repository)
);

const router = Router();

router.post(
    "/game-sessions",
    gameSessionController.create.bind(gameSessionController)
);

router.get(
    "/game-sessions/:id",
    gameSessionController.getById.bind(gameSessionController)
);

router.put(
    "/game-sessions/:id",
    gameSessionController.update.bind(gameSessionController)
);

router.get(
    "/users/:userId/game-sessions",
    gameSessionController.getByUserId.bind(gameSessionController)
);

export { router as gameSessionRoutes };

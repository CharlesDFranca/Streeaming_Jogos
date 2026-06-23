import type { Request, Response } from "express";
import type { CreateGameSessionUseCase } from "../app/use-case/gamesession/CreateGameSessionUseCase";
import type { GetGameSessionByIdUseCase } from "../app/use-case/gamesession/GetGameSessionByIdUseCase";
import type { GetUserGameSessionsUseCase } from "../app/use-case/gamesession/GetUserGameSessionsUseCase";
import type { UpdateGameSessionUseCase } from "../app/use-case/gamesession/UpdateGameSessionUseCase";

export class GameSessionController {
  constructor(
    private readonly createGameSessionUseCase: CreateGameSessionUseCase,
    private readonly getGameSessionByIdUseCase: GetGameSessionByIdUseCase,
    private readonly getUserGameSessionsUseCase: GetUserGameSessionsUseCase,
    private readonly updateGameSessionUseCase: UpdateGameSessionUseCase,
  ) {}

  async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const result =
        await this.createGameSessionUseCase.execute({
          startDate: new Date(req.body.startDate),
          startTime: req.body.startTime,
          playedMinutes: req.body.playedMinutes,
          averagePingMs: req.body.averagePingMs,
        });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Unexpected error",
      });
    }
  }

  async getById(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const result =
        await this.getGameSessionByIdUseCase.execute({
          id: req.params.id as string,
        });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        message:
          error instanceof Error
            ? error.message
            : "Unexpected error",
      });
    }
  }

  async getByUserId(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const result =
        await this.getUserGameSessionsUseCase.execute({
          userId: req.params.userId  as string,
        });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Unexpected error",
      });
    }
  }

  async update(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const result =
        await this.updateGameSessionUseCase.execute({
          id: req.params.id  as string,
        });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Unexpected error",
      });
    }
  }
}
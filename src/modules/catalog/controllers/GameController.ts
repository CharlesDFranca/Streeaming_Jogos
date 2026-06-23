import type { Request, Response } from "express";
import type { CreateGameUseCase } from "../app/use-cases/games/CreateGameUseCase";
import type { GetGameByIdUseCase } from "../app/use-cases/games/GetGameByIdUseCase";
import type { ListGamesUseCase } from "../app/use-cases/games/ListGamesUseCase";


export class GameController {
  constructor(
    private readonly createGameUseCase: CreateGameUseCase,
    private readonly getGameByIdUseCase: GetGameByIdUseCase,
    private readonly listGamesUseCase: ListGamesUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.createGameUseCase.execute({
        title: req.body.title,
        description: req.body.description,
        minimumAge: req.body.minimumAge,
        releaseDate: new Date(req.body.releaseDate),
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.getGameByIdUseCase.execute({
        id: req.params.id as string,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.listGamesUseCase.execute();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }
}
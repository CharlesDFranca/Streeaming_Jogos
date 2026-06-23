import type { Request, Response } from "express";
import type { CreateUserUseCase } from "../app/use-cases/CreateUserUseCase";
import type { DeleteUserUseCase } from "../app/use-cases/DeleteUseerUseCase";
import type { GetUserByIdUseCase } from "../app/use-cases/GetUserByIdUseCase";
import type { UpdateUserUseCase } from "../app/use-cases/UpdateUserUseCase";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const result = await this.createUserUseCase.execute({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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
        await this.getUserByIdUseCase.execute({
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

  async update(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const result =
        await this.updateUserUseCase.execute({
          id: req.params.id as string,
          name: req.body.name,
          email: req.body.email,
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

  async delete(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      await this.deleteUserUseCase.execute({
        id: req.params.id as string,
      });

      return res.sendStatus(204);
    } catch (error) {
      return res.status(404).json({
        message:
          error instanceof Error
            ? error.message
            : "Unexpected error",
      });
    }
  }
}
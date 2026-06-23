import type { Request, Response } from "express";
import type { GetPlanByIdUseCase } from "../app/use-cases/plans/GetPlanByIdUseCase";
import type { ListPlansUseCase } from "../app/use-cases/plans/ListPlansUseCase";

export class PlanController {
  constructor(
    private readonly getPlanByIdUseCase: GetPlanByIdUseCase,
    private readonly listPlansUseCase: ListPlansUseCase,
  ) {}

  async getById(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const result =
        await this.getPlanByIdUseCase.execute({
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

  async list(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const result =
        await this.listPlansUseCase.execute();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : "Unexpected error",
      });
    }
  }
}
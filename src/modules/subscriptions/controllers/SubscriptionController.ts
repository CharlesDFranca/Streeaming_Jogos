import type { Request, Response } from "express";
import type { CreateSubscriptionUseCase } from "../app/use-cases/subscriptions/CreateSubscriptionUseCase";
import type { GetSubscriptionByUserIdUseCase } from "../app/use-cases/subscriptions/GetDescriptionByUserIdUseCase";
import type { GetSubscriptionByIdUseCase } from "../app/use-cases/subscriptions/GetSubscriptionByIdUseCase";

export class SubscriptionController {
  constructor(
    private readonly createSubscriptionUseCase: CreateSubscriptionUseCase,
    private readonly getSubscriptionByIdUseCase: GetSubscriptionByIdUseCase,
    private readonly getSubscriptionByUserIdUseCase: GetSubscriptionByUserIdUseCase,
  ) {}

  async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const result =
        await this.createSubscriptionUseCase.execute({
          userId: req.body.userId,
          planId: req.body.planId,
          startDate: new Date(req.body.startDate),
          endDate: new Date(req.body.endDate),
          status: req.body.status,
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
        await this.getSubscriptionByIdUseCase.execute({
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
        await this.getSubscriptionByUserIdUseCase.execute({
          userId: req.params.userId as string,
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
}
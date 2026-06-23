import { Router } from "express";

import { PlanController } from "../controllers/PlanController";

import { GetPlanByIdUseCase } from "../app/use-cases/plans/GetPlanByIdUseCase";
import { ListPlansUseCase } from "../app/use-cases/plans/ListPlansUseCase";
import { TypeOrmPlanRepository } from "../infra/repositories/PlanRepository";

const repository = new TypeOrmPlanRepository();

const planController = new PlanController(
    new GetPlanByIdUseCase(repository),
    new ListPlansUseCase(repository)
);

const router = Router();

router.get("/plans", planController.list.bind(planController));

router.get("/plans/:id", planController.getById.bind(planController));

export { router as planRoutes };

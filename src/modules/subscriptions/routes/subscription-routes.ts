import { Router } from "express";

import { SubscriptionController } from "../controllers/SubscriptionController";
import { TypeOrmSubscriptionRepository } from "../infra/repositories/SubscriptionRepository";
import { CreateSubscriptionUseCase } from "../app/use-cases/subscriptions/CreateSubscriptionUseCase";
import { GetSubscriptionByIdUseCase } from "../app/use-cases/subscriptions/GetSubscriptionByIdUseCase";
import { GetSubscriptionByUserIdUseCase } from "../app/use-cases/subscriptions/GetDescriptionByUserIdUseCase";

const repository = new TypeOrmSubscriptionRepository();

const subscriptionController = new SubscriptionController(
    new CreateSubscriptionUseCase(repository),
    new GetSubscriptionByIdUseCase(repository),
    new GetSubscriptionByUserIdUseCase(repository)
);

const router = Router();

router.post(
    "/subscriptions",
    subscriptionController.create.bind(subscriptionController)
);

router.get(
    "/subscriptions/:id",
    subscriptionController.getById.bind(subscriptionController)
);

router.get(
    "/users/:userId/subscriptions",
    subscriptionController.getByUserId.bind(subscriptionController)
);

export { router as subscriptionRoutes };

import { Router } from "express";

import { DeveloperController } from "../controllers/DeveloperController";
import { TypeOrmDeveloperRepository } from "../infra/repositories/DeveloperRepository";
import { CreateDeveloperUseCase } from "../app/use-cases/developers/CreateDeveloperUseCase";
import { GetDeveloperByIdUseCase } from "../app/use-cases/developers/GetDeveloperByIdUseCase";
import { ListDevelopersUseCase } from "../app/use-cases/developers/ListDevelopersUseCase";
import { GetDeveloperByNameUseCase } from "../app/use-cases/developers/GetDeveloperByNameUseCase";
import { DeleteDeveloperUseCase } from "../app/use-cases/developers/DeleteDeveloperUseCase";

const repository = new TypeOrmDeveloperRepository();

const developerController = new DeveloperController(
    new CreateDeveloperUseCase(repository),
    new GetDeveloperByIdUseCase(repository),
    new GetDeveloperByNameUseCase(repository),
    new ListDevelopersUseCase(repository),
    new DeleteDeveloperUseCase(repository)
);

const router = Router();

router.post(
    "/developers",
    developerController.create.bind(developerController)
);

router.get("/developers", developerController.list.bind(developerController));

router.get(
    "/developers/search",
    developerController.getByName.bind(developerController)
);

router.get(
    "/developers/:id",
    developerController.getById.bind(developerController)
);

router.delete(
    "/developers/:id",
    developerController.delete.bind(developerController)
);

export { router as developerRoutes };

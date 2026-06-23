import { Router } from "express";

import { CategoryController } from "../controllers/CategoryController";
import { TypeOrmCategoryRepository } from "../infra/repositories/CategoryRepository";
import { CreateCategoryUseCase } from "../app/use-cases/categories/CreateCategoryUseCase";
import { DeleteCategoryUseCase } from "../app/use-cases/categories/DeleteCategoryUseCase";
import { FindCategoryByIdUseCase } from "../app/use-cases/categories/FindCategoryByIdUseCase";
import { ListCategoriesUseCase } from "../app/use-cases/categories/ListCategoriesUseCase";
import { UpdateCategoryUseCase } from "../app/use-cases/categories/UpdateCategoryUseCase";

const repository = new TypeOrmCategoryRepository();

const categoryController = new CategoryController(
    new CreateCategoryUseCase(repository),
    new FindCategoryByIdUseCase(repository),
    new ListCategoriesUseCase(repository),
    new UpdateCategoryUseCase(repository),
    new DeleteCategoryUseCase(repository)
);

const router = Router();

router.post("/categories", categoryController.create.bind(categoryController));

router.get("/categories", categoryController.list.bind(categoryController));

router.get(
    "/categories/:id",
    categoryController.getById.bind(categoryController)
);

router.put(
    "/categories/:id",
    categoryController.update.bind(categoryController)
);

router.delete(
    "/categories/:id",
    categoryController.delete.bind(categoryController)
);

export { router as categoryRoutes };

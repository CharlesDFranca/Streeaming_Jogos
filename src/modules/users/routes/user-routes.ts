import { Router } from "express";
import { UserController } from "../controllers/UserControler";
import { CreateUserUseCase } from "../app/use-cases/CreateUserUseCase";
import { TypeOrmUserRepository } from "../infra/repositories/TypeOrmUserRepository";
import { GetUserByIdUseCase } from "../app/use-cases/GetUserByIdUseCase";
import { UpdateUserUseCase } from "../app/use-cases/UpdateUserUseCase";
import { DeleteUserUseCase } from "../app/use-cases/DeleteUseerUseCase";

const repository = new TypeOrmUserRepository();
const userController = new UserController(
    new CreateUserUseCase(repository),
    new GetUserByIdUseCase(repository),
    new UpdateUserUseCase(repository),
    new DeleteUserUseCase(repository)
);

const router = Router();

router.post("/users", userController.create.bind(userController));

router.get("/users/:id", userController.getById.bind(userController));

router.put("/users/:id", userController.update.bind(userController));

router.delete("/users/:id", userController.delete.bind(userController));

export { router as userRoutes };

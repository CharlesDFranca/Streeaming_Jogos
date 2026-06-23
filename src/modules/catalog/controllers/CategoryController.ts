import type { Request, Response } from "express";
import type { CreateCategoryUseCase } from "../app/use-cases/categories/CreateCategoryUseCase";
import type { DeleteCategoryUseCase } from "../app/use-cases/categories/DeleteCategoryUseCase";
import type { FindCategoryByIdUseCase } from "../app/use-cases/categories/FindCategoryByIdUseCase";
import type { ListCategoriesUseCase } from "../app/use-cases/categories/ListCategoriesUseCase";
import type { UpdateCategoryUseCase } from "../app/use-cases/categories/UpdateCategoryUseCase";

export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.createCategoryUseCase.execute({
        name: req.body.name,
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
      const result = await this.findCategoryByIdUseCase.execute({
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
      const result = await this.listCategoriesUseCase.execute();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.updateCategoryUseCase.execute({
        id: req.params.id as string,
        name: req.body.name,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.deleteCategoryUseCase.execute({
        id: req.params.id as string,
      });

      return res.sendStatus(204);
    } catch (error) {
      return res.status(404).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }
}
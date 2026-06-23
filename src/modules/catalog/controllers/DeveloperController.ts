import type { Request, Response } from "express";
import type { CreateDeveloperUseCase } from "../app/use-cases/developers/CreateDeveloperUseCase";
import type { DeleteDeveloperUseCase } from "../app/use-cases/developers/DeleteDeveloperUseCase";
import type { GetDeveloperByIdUseCase } from "../app/use-cases/developers/GetDeveloperByIdUseCase";
import type { GetDeveloperByNameUseCase } from "../app/use-cases/developers/GetDeveloperByNameUseCase";
import type { ListDevelopersUseCase } from "../app/use-cases/developers/ListDevelopersUseCase";

export class DeveloperController {
  constructor(
    private readonly createDeveloperUseCase: CreateDeveloperUseCase,
    private readonly getDeveloperByIdUseCase: GetDeveloperByIdUseCase,
    private readonly getDeveloperByNameUseCase: GetDeveloperByNameUseCase,
    private readonly listDevelopersUseCase: ListDevelopersUseCase,
    private readonly deleteDeveloperUseCase: DeleteDeveloperUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.createDeveloperUseCase.execute({
        name: req.body.name,
        headquartersCountry: req.body.headquartersCountry,
        officialWebsite: req.body.officialWebsite,
        foundationYear: req.body.foundationYear,
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
      const result = await this.getDeveloperByIdUseCase.execute({
        id: req.params.id as string,
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async getByName(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.getDeveloperByNameUseCase.execute({
        name: req.query.name as string,
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
      const result = await this.listDevelopersUseCase.execute();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.deleteDeveloperUseCase.execute({
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
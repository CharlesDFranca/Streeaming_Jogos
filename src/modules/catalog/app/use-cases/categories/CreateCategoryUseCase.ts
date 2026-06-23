import { Category } from "@modules/catalog/entities/Category/";
import type { CategoryRepository } from "@modules/catalog/repositories/CategoryRepository/";
import { CategoryNameVO } from "@modules/catalog/value-objects/CategoryNameVO/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";
import { randomUUID } from "crypto";


export type CreateCategoryInput = {
  name: string;
};

export type CreateCategoryOutput = {
  id: string;
};

export class CreateCategoryUseCase implements UseCase<
  CreateCategoryInput,
  CreateCategoryOutput
> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const existing = await this.categoryRepository.findByName(input.name);

    if (existing) {
      throw new Error("Category already exists");
    }

    const category = new Category(randomUUID(), {
      name: new CategoryNameVO(input.name)
    });

    await this.categoryRepository.save(category);

    return {
      id: category.id,
    };
  }
}
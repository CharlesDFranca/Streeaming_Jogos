import { Category } from "@modules/catalog/entities/Category/";
import type { CategoryRepository } from "@modules/catalog/repositories/CategoryRepository/";
import { CategoryNameVO } from "@modules/catalog/value-objects/CategoryNameVO/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";

export type UpdateCategoryInput = {
  id: string;
  name: string;
};

export type UpdateCategoryOutput = {
  id: string;
};

export class UpdateCategoryUseCase implements UseCase<
  UpdateCategoryInput,
  UpdateCategoryOutput
> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const categoryExists = await this.categoryRepository.findById(input.id);

    if (!categoryExists) {
      throw new Error("Category not found");
    }

    const categoryWithSameName = await this.categoryRepository.findByName(
      input.name,
    );

    if (categoryWithSameName && categoryWithSameName.id !== input.id) {
      throw new Error("Category already exists");
    }

    const category = new Category(input.id, {
      name: new CategoryNameVO(input.name)
    });

    await this.categoryRepository.save(category);

    return {
      id: category.id,
    };
  }
}
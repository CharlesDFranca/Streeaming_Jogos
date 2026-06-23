import type { CategoryRepository } from "@modules/catalog/repositories/CategoryRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";
export type FindCategoryByIdInput = {
  id: string;
};

export type FindCategoryByIdOutput = {
  id: string;
  name: string;
};

export class FindCategoryByIdUseCase implements UseCase<
  FindCategoryByIdInput,
  FindCategoryByIdOutput
> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: FindCategoryByIdInput): Promise<FindCategoryByIdOutput> {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      throw new Error("Category not found");
    }

    return {
      id: category.id,
      name: category.name.value,
    };
  }
}
import type { CategoryRepository } from "@modules/catalog/repositories/CategoryRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";

export type DeleteCategoryInput = {
  id: string;
};

export type DeleteCategoryOutput = void;

export class DeleteCategoryUseCase implements UseCase<
  DeleteCategoryInput,
  DeleteCategoryOutput
> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      throw new Error("Category not found");
    }

    await this.categoryRepository.delete(input.id);
  }
}
import type { CategoryRepository } from "@modules/catalog/repositories/CategoryRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";

export type ListCategoriesInput = void;

export type ListCategoriesOutput = {
  id: string;
  name: string;
}[];

export class ListCategoriesUseCase implements UseCase<
  ListCategoriesInput,
  ListCategoriesOutput
> {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<ListCategoriesOutput> {
    const categories = await this.categoryRepository.listAll();

    return categories.map((category) => ({
      id: category.id,
      name: category.name.value,
    }));
  }
}
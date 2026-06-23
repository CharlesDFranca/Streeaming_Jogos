
import type { DeveloperRepository } from "@modules/catalog/repositories/DeveloperRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";

export type ListDevelopersInput = void;

export type ListDevelopersOutput = {
  developers: {
    id: string;
    name: string;
  }[];
};


export class ListDevelopersUseCase
  implements UseCase<ListDevelopersInput, ListDevelopersOutput>
{
  constructor(private readonly developerRepository: DeveloperRepository) {}

  async execute(): Promise<ListDevelopersOutput> {
    const developers = await this.developerRepository.listAll();

    return {
      developers: developers.map((developer) => ({
        id: developer.id,
        name: developer.name.value,
      })),
    };
  }
}
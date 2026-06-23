export type GetDeveloperByIdInput = {
  id: string;
};

export type GetDeveloperByIdOutput = {
  id: string;
  name: string;
};

import type { DeveloperRepository } from "@modules/catalog/repositories/DeveloperRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";


export class GetDeveloperByIdUseCase
  implements UseCase<GetDeveloperByIdInput, GetDeveloperByIdOutput>
{
  constructor(private readonly developerRepository: DeveloperRepository) {}

  async execute(input: GetDeveloperByIdInput): Promise<GetDeveloperByIdOutput> {
    const developer = await this.developerRepository.findById(input.id);

    if (!developer) {
      throw new Error("Developer not found");
    }

    return {
      id: developer.id,
      name: developer.name.value,
    };
  }
}
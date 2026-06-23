export type GetDeveloperByNameInput = {
 name: string;
};

export type GetDeveloperByNameOutput = {
  id: string;
  name: string;
};

import type { UseCase } from "@shared/app/use-cases/UseCase/";
import type { DeveloperRepository } from "../../repositories/DeveloperRepository";


export class GetDeveloperByNameUseCase
  implements UseCase<GetDeveloperByNameInput, GetDeveloperByNameOutput>
{
  constructor(private readonly developerRepository: DeveloperRepository) {}

  async execute(
    input: GetDeveloperByNameInput,
  ): Promise<GetDeveloperByNameOutput> {
    const developer = await this.developerRepository.findByName(input.name);

    if (!developer) {
      throw new Error("Developer not found");
    }

    return {
      id: developer.id,
      name: developer.name.value,
    };
  }
}
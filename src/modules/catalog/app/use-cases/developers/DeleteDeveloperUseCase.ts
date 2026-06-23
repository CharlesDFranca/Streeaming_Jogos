export type DeleteDeveloperInput = {
  id: string;
};

export type DeleteDeveloperOutput = void;

import type { DeveloperRepository } from "@modules/catalog/repositories/DeveloperRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";

export class DeleteDeveloperUseCase
  implements UseCase<DeleteDeveloperInput, DeleteDeveloperOutput>
{
  constructor(private readonly developerRepository: DeveloperRepository) {}

  async execute(input: DeleteDeveloperInput): Promise<DeleteDeveloperOutput> {
    const developer = await this.developerRepository.findById(input.id);

    if (!developer) {
      throw new Error("Developer not found");
    }

    await this.developerRepository.delete(input.id);
  }
}
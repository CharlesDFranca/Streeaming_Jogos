
export type CreateDeveloperInput = {
  name: string;
  headquartersCountry: string;
  officialWebsite: string
};

export type CreateDeveloperOutput = {
  id: string;
};

import { randomUUID } from "crypto";
import type { UseCase } from "@shared/app/use-cases/UseCase/";
import type { DeveloperRepository } from "../../repositories/DeveloperRepository";
import { Developer } from "../../entities/Developer";
import { DeveloperNameVO } from "../../value-objects/DeveloperNameVO";
import { CountryVO } from "../../value-objects/CountryVO";
import { WebsiteVO } from "../../value-objects/WebsiteVo";


export class CreateDeveloperUseCase
  implements UseCase<CreateDeveloperInput, CreateDeveloperOutput>
{
  constructor(private readonly developerRepository: DeveloperRepository) {}

  async execute(input: CreateDeveloperInput): Promise<CreateDeveloperOutput> {
    const existing = await this.developerRepository.findByName(input.name);

    if (existing) {
      throw new Error("Developer already exists");
    }

    const developer = new Developer(randomUUID(), {
      name: new DeveloperNameVO(input.name),
      headquartersCountry: new CountryVO(input.headquartersCountry),
      officialWebsite: new WebsiteVO(input.officialWebsite)
    });

    await this.developerRepository.save(developer);

    return {
      id: developer.id,
    };
  }
}
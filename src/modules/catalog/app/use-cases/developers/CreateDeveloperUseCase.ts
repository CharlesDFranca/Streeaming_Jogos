import { randomUUID } from "crypto";
import type { UseCase } from "@shared/app/use-cases/UseCase/";
import type { DeveloperRepository } from "@modules/catalog/repositories/DeveloperRepository/";
import { Developer } from "@modules/catalog/entities/Developer/";
import { DeveloperNameVO } from "@modules/catalog/value-objects/DeveloperNameVO/";
import { CountryVO } from "@modules/catalog/value-objects/CountryVO/";
import { WebsiteVO } from "@modules/catalog/value-objects/WebsiteVo/";
import { FoundationYearVO } from "@modules/catalog/value-objects/FoundationYearVO/";

export type CreateDeveloperInput = {
  name: string;
  headquartersCountry: string;
  officialWebsite: string,
  foundationYear: number
};

export type CreateDeveloperOutput = {
  id: string;
};

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
      officialWebsite: new WebsiteVO(input.officialWebsite),
      foundationYear: new FoundationYearVO(input.foundationYear)
    });

    await this.developerRepository.save(developer);

    return {
      id: developer.id,
    };
  }
}
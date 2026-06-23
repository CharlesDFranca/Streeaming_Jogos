import { Game } from "@modules/catalog/entities/Game/";
import type { GameRepository } from "@modules/catalog/repositories/GameRepository/";
import { DescriptionVO } from "@modules/catalog/value-objects/DescrptionVO/";
import { GameTitleVO } from "@modules/catalog/value-objects/GameTitleVO/";
import { MinimumAgeVO } from "@modules/catalog/value-objects/MinimumAgeVO/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";
import { randomUUID } from "crypto";

export type CreateGameInput = {
  title: string;
  description: string;
  minimumAge: number;
  releaseDate: Date;
};

export type CreateGameOutput = {
  id: string;
};


export class CreateGameUseCase
  implements UseCase<CreateGameInput, CreateGameOutput>
{
  constructor(
    private readonly gameRepository: GameRepository,
  ) {}

  async execute(
    input: CreateGameInput,
  ): Promise<CreateGameOutput> {
    const existing = await this.gameRepository.findByTitle(
      input.title,
    );

    if (existing) {
      throw new Error("Game already exists");
    }

    const game = new Game(randomUUID(), {
      releaseDate: input.releaseDate,
      title: new GameTitleVO(input.title),
      description: new DescriptionVO(input.description),
      minimumAge: new MinimumAgeVO(input.minimumAge),
    });

    await this.gameRepository.save(game);

    return {
      id: game.id,
    };
  }
}
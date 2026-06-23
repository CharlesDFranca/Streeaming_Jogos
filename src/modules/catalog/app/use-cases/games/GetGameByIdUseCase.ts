import type { GameRepository } from "@modules/catalog/repositories/GameRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";

export type GetGameByIdInput = {
  id: string;
};

export type GetGameByIdOutput = {
  id: string;
  title: string;
  description: string;
  minimumAge: number;
  releaseDate: Date;
};

export class GetGameByIdUseCase
  implements UseCase<
    GetGameByIdInput,
    GetGameByIdOutput
  >
{
  constructor(
    private readonly gameRepository: GameRepository,
  ) {}

  async execute(
    input: GetGameByIdInput,
  ): Promise<GetGameByIdOutput> {
    const game = await this.gameRepository.findById(
      input.id,
    );

    if (!game) {
      throw new Error("Game not found");
    }

    return {
      id: game.id,
      title: game.title.value,
      description: game.description.value,
      minimumAge: game.minimumAge.value,
      releaseDate: game.releaseDate,
    };
  }
}
import type { UseCase } from "@shared/app/use-cases/UseCase/";
import type { Game } from "@modules/catalog/entities/Game/";
import type { GameRepository } from "@modules/catalog/repositories/GameRepository/";

export type ListGamesInput = void;

export type ListGamesOutput = {
  id: string;
  title: string;
  minimumAge: number;
  releaseDate: Date;
}[];

export class ListGamesUseCase
  implements UseCase<
    ListGamesInput,
    ListGamesOutput
  >
{
  constructor(
    private readonly gameRepository: GameRepository,
  ) {}

  async execute(): Promise<ListGamesOutput> {
    const games = await this.gameRepository.listAll();

    return games.map((game: Game) => ({
      id: game.id,
      title: game.title.value,
      minimumAge: game.minimumAge.value,
      releaseDate: game.releaseDate,
    }));
  }
}
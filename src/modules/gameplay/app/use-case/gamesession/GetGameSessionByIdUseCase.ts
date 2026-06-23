import type { GameSessionRepository } from "@modules/gameplay/repositories/GameSessionRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";

export type GetGameSessionByIdInput = {
  id: string;
};

export type GetGameSessionByIdOutput = {
  id: string;
  
};

export class GetGameSessionByIdUseCase
  implements UseCase<
    GetGameSessionByIdInput,
    GetGameSessionByIdOutput
  >
{
  constructor(
    private readonly gameSessionRepository: GameSessionRepository,
  ) {}

  async execute(
    input: GetGameSessionByIdInput,
  ): Promise<GetGameSessionByIdOutput> {
    const session =
      await this.gameSessionRepository.findById(input.id);

    if (!session) {
      throw new Error("Game session not found");
    }

    return {
      id: session.id,
    };
  }
}
import type { GameSessionRepository } from "@modules/gameplay/repositories/GameSessionRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";

export type GetUserGameSessionsInput = {
  userId: string;
};

export type GetUserGameSessionsOutput = {
  sessions: {
    id: string;
    
  }[];
};

export class GetUserGameSessionsUseCase
  implements UseCase<
    GetUserGameSessionsInput,
    GetUserGameSessionsOutput
  >
{
  constructor(
    private readonly gameSessionRepository: GameSessionRepository,
  ) {}

  async execute(
    input: GetUserGameSessionsInput,
  ): Promise<GetUserGameSessionsOutput> {
    const sessions =
      await this.gameSessionRepository.findByUserId(
        input.userId,
      );

    return {
      sessions: sessions.map((session) => ({
        id: session.id,
      })),
    };
  }
}
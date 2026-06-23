import type { GameSessionRepository } from "@modules/gameplay/repositories/GameSessionRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";

export type UpdateGameSessionInput = {
  id: string;
};
export type UpdateGameSessionOutput = {
  id: string;
};



export class UpdateGameSessionUseCase
  implements UseCase<
    UpdateGameSessionInput,
    UpdateGameSessionOutput
  >
{
  constructor(
    private readonly gameSessionRepository: GameSessionRepository,
  ) {}

  async execute(
    input: UpdateGameSessionInput,
  ): Promise<UpdateGameSessionOutput> {
    const session =
      await this.gameSessionRepository.findById(input.id);

    if (!session) {
      throw new Error("Game session not found");
    }


    await this.gameSessionRepository.save(session);

    return {
      id: session.id,
    };
  }
}
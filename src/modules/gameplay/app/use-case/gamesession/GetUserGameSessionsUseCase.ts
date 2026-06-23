import type { GameSessionRepository } from "@modules/gameplay/repositories/GameSessionRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";
import { AppDataSource } from "@shared/infra/database/AppSource/";
import { GameSessionOrmEntity } from "@modules/gameplay/infra/database/entities/GameSessionEntity/";

export type GetUserGameSessionsInput = {
  userId: string;
};

export type GetUserGameSessionsOutput = {
  id: string;
  startDate: Date;
  startTime: string;
  playedMinutes: number;
  averagePingMs: number;
  game?: {
    id: string;
    title: string;
  };
}[];

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
    const ormRepo = AppDataSource.getRepository(GameSessionOrmEntity);

    const sessions = await ormRepo.find({
      where: { user: { id: input.userId } },
      relations: { game: true },
    });

    return sessions.map((session) => ({
      id: session.id,
      startDate: session.startDate,
      startTime: session.startTime,
      playedMinutes: session.playedMinutes,
      averagePingMs: session.averagePingMs,
      game: session.game ? {
        id: session.game.id,
        title: session.game.title,
      } : undefined
    }));
  }
}
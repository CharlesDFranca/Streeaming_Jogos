import { GameSession } from "@modules/gameplay/entities/GameSession/";
import type { GameSessionRepository } from "@modules/gameplay/repositories/GameSessionRepository/";
import { HourVO } from "@modules/gameplay/value-objects/HourVO/";
import { PingVO } from "@modules/gameplay/value-objects/PingVO/";
import { PlayedMinutesVO } from "@modules/gameplay/value-objects/PlayedMinutesVO/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";
import { randomUUID } from "crypto";

export type CreateGameSessionInput = {
     startDate: Date;
      startTime: string;
      playedMinutes: number;
      averagePingMs: number;
};

export type CreateGameSessionOutput = {
  id: string;
};


export class CreateGameSessionUseCase
  implements UseCase<CreateGameSessionInput, CreateGameSessionOutput>
{
  constructor(
    private readonly gameSessionRepository: GameSessionRepository,
  ) {}

  async execute(
    input: CreateGameSessionInput,
  ): Promise<CreateGameSessionOutput> {
    const session = new GameSession(randomUUID(), {
        averagePingMs: new PingVO(input.averagePingMs),
        playedMinutes: new PlayedMinutesVO(input.playedMinutes),
        startTime: new HourVO(input.startTime),
        startDate: new Date(input.startDate), 
    });

    await this.gameSessionRepository.save(session);

    return {
      id: session.id,
    };
  }
}
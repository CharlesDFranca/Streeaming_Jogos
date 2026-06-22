import { GameSession } from "../../entities/GameSession";
import { HourVO } from "../../value-objects/HourVO";
import { PingVO } from "../../value-objects/PingVO";
import { PlayedMinutesVO } from "../../value-objects/PlayedMinutesVO";
import { GameSessionOrmEntity } from "../database/entities/GameSessionEntity";

export class GameSessionMapper {
  static toDomain(raw: GameSessionOrmEntity): GameSession {
    return new GameSession(
      raw.id,
      {
        startDate: raw.startDate,
        startTime: new HourVO(raw.startTime),
        playedMinutes: new PlayedMinutesVO(raw.playedMinutes),
        averagePingMs: new PingVO(raw.averagePingMs),
      },
      raw.createdAt,
      raw.updatedAt
    );
  }

  static toPersistence(domain: GameSession): GameSessionOrmEntity {
    const entity = new GameSessionOrmEntity();

    entity.id = domain.id;
    entity.startDate = domain.startDate;
    entity.startTime = domain.startTime.value;
    entity.playedMinutes = domain.playedMinutes.value;
    entity.averagePingMs = domain.averagePingMs.value;

    return entity;
  }
}
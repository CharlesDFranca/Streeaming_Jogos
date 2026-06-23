import { Repository } from "typeorm";
import type { GameSessionRepository } from "../../repositories/GameSessionRepository";
import { GameSessionOrmEntity } from "../database/entities/GameSessionEntity";
import type { GameSession } from "../../entities/GameSession";
import { GameSessionMapper } from "../mapper/GameSessionMapper";
import { AppDataSource } from "@shared/infra/database/AppSource/";

export class TypeOrmGameSessionRepository implements GameSessionRepository {
  private readonly ormRepo = AppDataSource.getRepository(GameSessionOrmEntity)

  async findById(id: string): Promise<GameSession | null> {
    const session = await this.ormRepo.findOne({
      where: { id },
    });

    if (!session) return null;

    return GameSessionMapper.toDomain(session);
  }

  async findByUserId(userId: string): Promise<GameSession[]> {
    const sessions = await this.ormRepo.find({
      where: { user: { id: userId } },
      relations: { user: true, game: true },
    });

    return sessions.map(GameSessionMapper.toDomain);
  }

  async save(session: GameSession): Promise<void> {
    const persistence = GameSessionMapper.toPersistence(session);

    await this.ormRepo.save(persistence);
  }
}

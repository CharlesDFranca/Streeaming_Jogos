import { Repository } from "typeorm";
import type { GameRepository } from "../../repositories/GameRepository";
import { GameOrmEntity } from "../database/entities/GameEntity";
import type { Game } from "../../entities/Game";
import { GameMapper } from "../mappers/GameMapper";
import { AppDataSource } from "@shared/infra/database/AppSource/";

export class TypeOrmGameRepository implements GameRepository {
  private readonly ormRepo =  AppDataSource.getRepository(GameOrmEntity)

  async findById(id: string): Promise<Game | null> {
    const game = await this.ormRepo.findOne({
      where: { id },
      relations: {
        categories: true,
        developer: true,
      },
    });

    if (!game) return null;

    return GameMapper.toDomain(game);
  }

  async findByTitle(title: string): Promise<Game | null> {
    const game = await this.ormRepo.findOne({
      where: { title },
      relations: { categories: true, developer: true },
    });

    if (!game) return null;

    return GameMapper.toDomain(game);
  }

  async listAll(): Promise<Game[]> {
    const games = await this.ormRepo.find({
      relations: { developer: true, categories: true },
    });

    return games.map(GameMapper.toDomain);
  }

  async save(game: Game): Promise<void> {
    const persistence = GameMapper.toPersistence(game);

    await this.ormRepo.save(persistence);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}

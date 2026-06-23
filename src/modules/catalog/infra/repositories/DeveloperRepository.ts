import { Repository } from "typeorm";
import type { DeveloperRepository } from "../../repositories/DeveloperRepository";
import { DeveloperOrmEntity } from "../database/entities/DeveloperEntity";
import type { Developer } from "../../entities/Developer";
import { DeveloperMapper } from "../mappers/DeveloperMapper";
import { AppDataSource } from "@shared/infra/database/AppSource/";

export class TypeOrmDeveloperRepository implements DeveloperRepository {
  private readonly ormRepo = AppDataSource.getRepository(DeveloperOrmEntity)

  async findById(id: string): Promise<Developer | null> {
    const dev = await this.ormRepo.findOne({
      where: { id },
    });

    if (!dev) return null;

    return DeveloperMapper.toDomain(dev);
  }

  async findByName(name: string): Promise<Developer | null> {
    const dev = await this.ormRepo.findOne({
      where: { name },
    });

    if (!dev) return null;

    return DeveloperMapper.toDomain(dev);
  }

  async listAll(): Promise<Developer[]> {
    const devs = await this.ormRepo.find();

    return devs.map(DeveloperMapper.toDomain);
  }

  async save(dev: Developer): Promise<void> {
    const persistence = DeveloperMapper.toPersistence(dev);

    await this.ormRepo.save(persistence);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}

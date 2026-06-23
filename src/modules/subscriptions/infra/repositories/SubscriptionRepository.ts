import { Repository } from "typeorm";
import type { SubscriptionRepository } from "../../repositories/SubscriptionRepository";
import { SubscriptionOrmEntity } from "../database/entities/SubscriptionEntity";
import type { Subscription } from "../../entities/Subscription";
import { SubscriptionMapper } from "../mappers/SubscriptionMapper";
import { AppDataSource } from "@shared/infra/database/AppSource/";

export class TypeOrmSubscriptionRepository implements SubscriptionRepository {
  private readonly ormRepo = AppDataSource.getRepository(SubscriptionOrmEntity)

  async findById(id: string): Promise<Subscription | null> {
    const sub = await this.ormRepo.findOne({
      where: { id },
    });

    if (!sub) return null;

    return SubscriptionMapper.toDomain(sub);
  }

  async findByUserId(userId: string): Promise<Subscription | null> {
    const sub = await this.ormRepo.findOne({
      where: { user: { id: userId } },
      relations: { user: true, plan: true },
    });

    if (!sub) return null;

    return SubscriptionMapper.toDomain(sub);
  }

  async save(sub: Subscription): Promise<void> {
    const persistence = SubscriptionMapper.toPersistence(sub);

    await this.ormRepo.save(persistence);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}

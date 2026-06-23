import { Repository } from "typeorm";
import type { PlanRepository } from "../../repositories/PlanRepository";
import { PlanOrmEntity } from "../database/entities/PlanEntity";
import type { Plan } from "../../entities/Plan";
import { PlanMapper } from "../mappers/PlanMapper";
import { AppDataSource } from "@shared/infra/database/AppSource/";

export class TypeOrmPlanRepository implements PlanRepository {
  private readonly ormRepo = AppDataSource.getRepository(PlanOrmEntity)

  async findById(id: string): Promise<Plan | null> {
    const plan = await this.ormRepo.findOne({
      where: { id },
    });

    if (!plan) return null;

    return PlanMapper.toDomain(plan);
  }

  async listAll(): Promise<Plan[]> {
    const plans = await this.ormRepo.find();

    return plans.map(PlanMapper.toDomain);
  }

  async save(plan: Plan): Promise<void> {
    const persistence = PlanMapper.toPersistence(plan);

    await this.ormRepo.save(persistence);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}

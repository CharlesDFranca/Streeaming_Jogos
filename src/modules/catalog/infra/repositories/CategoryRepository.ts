import { Repository } from "typeorm";
import type { CategoryRepository } from "../../repositories/CategoryRepository";
import { CategoryOrmEntity } from "../database/entities/CategoryEntity";
import type { Category } from "../../entities/Category";
import { CategoryMapper } from "../mappers/CategoryMapper";
import { AppDataSource } from "@shared/infra/database/AppSource/";

export class TypeOrmCategoryRepository implements CategoryRepository {
  private readonly ormRepo = AppDataSource.getRepository(CategoryOrmEntity)

  async findById(id: string): Promise<Category | null> {
    const category = await this.ormRepo.findOne({
      where: { id },
    });

    if (!category) return null;

    return CategoryMapper.toDomain(category);
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.ormRepo.findOne({
      where: { name },
    });

    if (!category) return null;

    return CategoryMapper.toDomain(category);
  }

  async listAll(): Promise<Category[]> {
    const categories = await this.ormRepo.find();

    return categories.map(CategoryMapper.toDomain);
  }

  async save(category: Category): Promise<void> {
    const persistence = CategoryMapper.toPersistence(category);

    await this.ormRepo.save(persistence);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}

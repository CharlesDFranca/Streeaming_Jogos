import { Category } from "@modules/catalog/entities/Category/";
import { CategoryOrmEntity } from "@modules/catalog/infra/database/entities/CategoryEntity/";
import { CategoryNameVO } from "@modules/catalog/value-objects/CategoryNameVO/";

export class CategoryMapper {
  static toDomain(raw: CategoryOrmEntity): Category {
    return new Category(
      raw.id,
      {
        name: new CategoryNameVO(raw.name),
      },
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(domain: Category): CategoryOrmEntity {
    const entity = new CategoryOrmEntity();

    entity.id = domain.id;
    entity.name = domain.name.value;

    return entity;
  }
}

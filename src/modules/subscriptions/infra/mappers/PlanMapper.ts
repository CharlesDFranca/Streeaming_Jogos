import { Plan } from "../../entities/Plan";
import { MonthlyPriceVO } from "../../value-objects/MonthlyPriceVO";
import { PlanNameVO } from "../../value-objects/PlanNameVO";
import { ResolutionVO } from "../../value-objects/ResolutionVO";
import { PlanOrmEntity } from "../database/entities/PlanEntity";

export class PlanMapper {
  static toDomain(raw: PlanOrmEntity): Plan {
    return new Plan(
      raw.id,
      {
        name: new PlanNameVO(raw.name),
        monthlyPrice: new MonthlyPriceVO(raw.monthlyPrice),
        maxResolution: new ResolutionVO(raw.maxResolution),
      },
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(domain: Plan): PlanOrmEntity {
    const entity = new PlanOrmEntity();

    entity.id = domain.id;
    entity.name = domain.name.value;
    entity.monthlyPrice = domain.monthlyPrice.value;
    entity.maxResolution = domain.maxResolution.value;

    return entity;
  }
}

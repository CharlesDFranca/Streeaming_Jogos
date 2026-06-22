import { Subscription } from "../../entities/Subscription";
import { SubscriptionStatusVO } from "../../value-objects/SubscriptionStatusVO";
import { SubscriptionOrmEntity } from "../database/entities/SubscriptionEntity";

export class SubscriptionMapper {
  static toDomain(raw: SubscriptionOrmEntity): Subscription {
    return new Subscription(
      raw.id,
      {
        startDate: raw.startDate,
        endDate: raw.endDate,
        status: new SubscriptionStatusVO(raw.status),
      },
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(domain: Subscription): SubscriptionOrmEntity {
    const entity = new SubscriptionOrmEntity();

    entity.id = domain.id;
    entity.startDate = domain.startDate;
    entity.endDate = domain.endDate;
    entity.status = domain.status.value;

    return entity;
  }
}

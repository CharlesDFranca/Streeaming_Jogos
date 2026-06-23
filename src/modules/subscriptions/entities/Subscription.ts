import { Entity } from "@shared/domain/entities/Entity/";
import type { SubscriptionStatusVO } from "../value-objects/SubscriptionStatusVO";

type SubscriptionProps = {
  userId: string,
  planId: string,
  startDate: Date;
  endDate: Date;
  status: SubscriptionStatusVO;
};

export class Subscription extends Entity<SubscriptionProps> {
  get userId(): string {
    return this.props.userId
  }

  get planId(): string {
    return this.props.planId
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get endDate(): Date {
    return this.props.endDate;
  }

  get status(): SubscriptionStatusVO {
    return this.props.status;
  }

  updateEndDate(endDate: Date): void {
    this.props.endDate = endDate;
    this.touch();
  }

  updateStatus(status: SubscriptionStatusVO): void {
    this.props.status = status;
    this.touch();
  }
}

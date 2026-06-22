import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class SubscriptionStatusVO extends ValueObject<string> {
  protected validate(status: string): string {
    const allowed = ["ACTIVE", "EXPIRED", "CANCELED"];

    if (!allowed.includes(status)) {
      throw new Error("Invalid subscription status");
    }

    return status;
  }
}

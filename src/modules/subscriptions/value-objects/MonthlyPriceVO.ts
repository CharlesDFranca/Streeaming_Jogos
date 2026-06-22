import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class MonthlyPriceVO extends ValueObject<number> {
  protected validate(price: number): number {
    if (price <= 0) {
      throw new Error("Monthly price must be greater than zero");
    }

    return price;
  }
}

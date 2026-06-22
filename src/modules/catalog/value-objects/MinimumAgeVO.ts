import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class MinimumAgeVO extends ValueObject<number> {
  protected validate(age: number): number {
    if (age < 0) {
      throw new Error("Minimum age cannot be negative");
    }

    if (age > 21) {
      throw new Error("Invalid minimum age");
    }

    return age;
  }
}

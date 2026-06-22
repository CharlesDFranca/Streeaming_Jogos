import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class PlanNameVO extends ValueObject<string> {
  protected validate(name: string): string {
    const value = name.trim();

    if (value.length < 3) {
      throw new Error("Plan name must have at least 3 characters");
    }

    return value;
  }
}

import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class DescriptionVO extends ValueObject<string> {
  protected validate(description: string): string {
    const value = description.trim();

    if (value.length < 10) {
      throw new Error("Description too short");
    }

    return value;
  }
}

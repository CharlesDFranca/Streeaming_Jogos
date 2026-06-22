import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class CategoryNameVO extends ValueObject<string> {
  protected validate(name: string): string {
    const value = name.trim();

    if (value.length < 2) {
      throw new Error("Category name too short");
    }

    return value;
  }
}

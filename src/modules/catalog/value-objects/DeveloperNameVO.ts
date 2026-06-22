import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class DeveloperNameVO extends ValueObject<string> {
  protected validate(name: string): string {
    const value = name.trim();

    if (value.length < 2) {
      throw new Error("Developer name too short");
    }

    return value;
  }
}

import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class NameVO extends ValueObject<string> {
  protected validate(name: string): string {
    const value = name.trim();

    if (value === "") throw new Error("Name cannot be empty");
    if (value.length < 3) throw new Error("Name too short");

    return value;
  }
}

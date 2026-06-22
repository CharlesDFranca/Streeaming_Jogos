import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class GameTitleVO extends ValueObject<string> {
  protected validate(title: string): string {
    const value = title.trim();

    if (value.length < 2) {
      throw new Error("Game title too short");
    }

    return value;
  }
}

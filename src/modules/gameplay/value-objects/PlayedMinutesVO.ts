import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class PlayedMinutesVO extends ValueObject<number> {
  protected validate(minutes: number): number {
    if (minutes < 0) {
      throw new Error("Played minutes cannot be negative");
    }

    return minutes;
  }
}

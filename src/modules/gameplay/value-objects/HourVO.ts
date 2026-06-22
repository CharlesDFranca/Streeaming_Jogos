import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class HourVO extends ValueObject<string> {
  protected validate(hour: string): string {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!regex.test(hour)) {
      throw new Error("Invalid hour format");
    }

    return hour;
  }
}

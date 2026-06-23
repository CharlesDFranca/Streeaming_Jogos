import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class FoundationYearVO extends ValueObject<number> {
  protected validate(year: number): number {
    const currentYear = new Date().getFullYear();

    if (!Number.isInteger(year) || year < 1950 || year > currentYear) {
      throw new Error(
        `Invalid foundation year. Must be between 1950 and ${currentYear}.`,
      );
    }

    return year;
  }
}

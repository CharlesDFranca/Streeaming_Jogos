import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class CountryVO extends ValueObject<string> {
  protected validate(country: string): string {
    const value = country.trim();

    if (value.length < 2) {
      throw new Error("Invalid country");
    }

    return value;
  }
}
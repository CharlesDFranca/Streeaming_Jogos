import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class EmailVO extends ValueObject<string> {
  constructor(email: string) {
    super(email);
  }

  protected validate(email: string): string {
    const value = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      throw new Error("Invalid email");
    }

    return value;
  }
}

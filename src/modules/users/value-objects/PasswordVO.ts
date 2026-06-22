import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class PasswordVO extends ValueObject<string> {
  constructor(password: string) {
    super(password);
  }

  protected validate(password: string): string {
    if (password.length < 8) {
      throw new Error("Password must have at least 8 characters");
    }

    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasLowerCase = /[a-z]/.test(password);
    // const hasNumber = /\d/.test(password);

    // if (!hasUpperCase) {
    //   throw new Error("Password must contain at least one uppercase letter");
    // }

    // if (!hasLowerCase) {
    //   throw new Error("Password must contain at least one lowercase letter");
    // }

    // if (!hasNumber) {
    //   throw new Error("Password must contain at least one number");
    // }

    return password;
  }
}

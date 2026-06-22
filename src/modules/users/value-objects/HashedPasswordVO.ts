import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class HashedPasswordVO extends ValueObject<string> {
  constructor(hash: string) {
    super(hash);
  }

  protected validate(hash: string): string {
    if (!hash || hash.trim() === "") {
      throw new Error("Hash cannot be empty");
    }

    return hash;
  }
}

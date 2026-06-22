import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class PingVO extends ValueObject<number> {
  protected validate(ping: number): number {
    if (ping < 0) {
      throw new Error("Ping cannot be negative");
    }

    return ping;
  }
}

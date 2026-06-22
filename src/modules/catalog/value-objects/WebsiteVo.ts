import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

export class WebsiteVO extends ValueObject<string> {
  protected validate(url: string): string {
    try {
      new URL(url);
      return url;
    } catch {
      throw new Error("Invalid website URL");
    }
  }
}

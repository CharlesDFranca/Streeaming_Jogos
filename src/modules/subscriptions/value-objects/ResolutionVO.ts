import { ValueObject } from "@shared/domain/value-objects/ValueObject/";

const ALLOWED_RESOLUTIONS = ["720p", "1080p", "1440p", "4K", "8K"] as const;

export class ResolutionVO extends ValueObject<string> {
  protected validate(resolution: string): string {
    if (!ALLOWED_RESOLUTIONS.includes(resolution as any)) {
      throw new Error("Invalid resolution");
    }

    return resolution;
  }
}

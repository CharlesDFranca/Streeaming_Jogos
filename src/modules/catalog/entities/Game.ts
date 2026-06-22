import { Entity } from "@shared/domain/entities/Entity/";
import type { GameTitleVO } from "../value-objects/GameTitleVO";
import type { DescriptionVO } from "../value-objects/DescrptionVO";
import type { MinimumAgeVO } from "../value-objects/MinimumAgeVO";

type GameProps = {
  releaseDate: Date;
  title: GameTitleVO;
  description: DescriptionVO;
  minimumAge: MinimumAgeVO;
};

export class Game extends Entity<GameProps> {
  get releaseDate(): Date {
    return this.props.releaseDate;
  }

  get title(): GameTitleVO {
    return this.props.title;
  }

  get description(): DescriptionVO {
    return this.props.description;
  }

  get minimumAge(): MinimumAgeVO {
    return this.props.minimumAge;
  }

  updateTitle(title: GameTitleVO): void {
    this.props.title = title;
    this.touch();
  }

  updateDescription(description: DescriptionVO): void {
    this.props.description = description;
    this.touch();
  }

  updateMinimumAge(age: MinimumAgeVO): void {
    this.props.minimumAge = age;
    this.touch();
  }
}

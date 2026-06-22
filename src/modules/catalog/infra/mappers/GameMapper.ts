import { Game } from "@modules/catalog/entities/Game/";
import { GameOrmEntity } from "@modules/catalog/infra/database/entities/GameEntity/";
import { DescriptionVO } from "@modules/catalog/value-objects/DescrptionVO/";
import { GameTitleVO } from "@modules/catalog/value-objects/GameTitleVO/";
import { MinimumAgeVO } from "@modules/catalog/value-objects/MinimumAgeVO/";

export class GameMapper {
  static toDomain(raw: GameOrmEntity): Game {
    return new Game(
      raw.id,
      {
        title: new GameTitleVO(raw.title),
        description: new DescriptionVO(raw.description),
        releaseDate: raw.releaseDate,
        minimumAge: new MinimumAgeVO(raw.minimumAge),
      },
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(domain: Game): GameOrmEntity {
    const entity = new GameOrmEntity();

    entity.id = domain.id;
    entity.title = domain.title.value;
    entity.description = domain.description.value;
    entity.releaseDate = domain.releaseDate;
    entity.minimumAge = domain.minimumAge.value;

    return entity;
  }
}

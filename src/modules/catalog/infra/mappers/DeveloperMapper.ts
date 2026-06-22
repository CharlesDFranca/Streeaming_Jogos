import { Developer } from "@modules/catalog/entities/Developer/";
import { DeveloperOrmEntity } from "@modules/catalog/infra/database/entities/DeveloperEntity/";
import { CountryVO } from "@modules/catalog/value-objects/CountryVO/";
import { DeveloperNameVO } from "@modules/catalog/value-objects/DeveloperNameVO/";
import { WebsiteVO } from "@modules/catalog/value-objects/WebsiteVo/";

export class DeveloperMapper {
  static toDomain(raw: DeveloperOrmEntity): Developer {
    return new Developer(
      raw.id,
      {
        name: new DeveloperNameVO(raw.name),
        headquartersCountry: new CountryVO(raw.headquartersCountry),
        officialWebsite: new WebsiteVO(raw.officialWebsite),
      },
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(domain: Developer): DeveloperOrmEntity {
    const entity = new DeveloperOrmEntity();

    entity.id = domain.id;
    entity.name = domain.name.value;
    entity.headquartersCountry = domain.headquartersCountry.value;
    entity.officialWebsite = domain.officialWebsite.value;

    return entity;
  }
}

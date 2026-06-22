import { Entity } from "@shared/domain/entities/Entity/";
import type { CountryVO } from "../value-objects/CountryVO";
import type { WebsiteVO } from "../value-objects/WebsiteVo";
import type { DeveloperNameVO } from "../value-objects/DeveloperNameVO";

type DeveloperProps = {
  headquartersCountry: CountryVO;
  name: DeveloperNameVO;
  officialWebsite: WebsiteVO;
};

export class Developer extends Entity<DeveloperProps> {
  get headquartersCountry(): CountryVO {
    return this.props.headquartersCountry;
  }

  get name(): DeveloperNameVO {
    return this.props.name;
  }

  get officialWebsite(): WebsiteVO {
    return this.props.officialWebsite;
  }

  updateName(name: DeveloperNameVO): void {
    this.props.name = name;
    this.touch();
  }

  updateHeadquartersCountry(country: CountryVO): void {
    this.props.headquartersCountry = country;
    this.touch();
  }

  updateOfficialWebsite(website: WebsiteVO): void {
    this.props.officialWebsite = website;
    this.touch();
  }
}

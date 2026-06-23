import { Entity } from "@shared/domain/entities/Entity/";
import type { CountryVO } from "../value-objects/CountryVO";
import type { WebsiteVO } from "../value-objects/WebsiteVo";
import type { DeveloperNameVO } from "../value-objects/DeveloperNameVO";
import type { FoundationYearVO } from "../value-objects/FoundationYearVO";

type DeveloperProps = {
  headquartersCountry: CountryVO;
  name: DeveloperNameVO;
  officialWebsite: WebsiteVO;
  foundationYear: FoundationYearVO;
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

  get foundationYear(): FoundationYearVO {
    return this.props.foundationYear;
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

  updateFoundationYear(year: FoundationYearVO): void {
    this.props.foundationYear = year;
    this.touch();
  }
}

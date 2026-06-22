import { Entity } from "@shared/domain/entities/Entity/";
import type { CategoryNameVO } from "../value-objects/CategoryNameVO";

type CategoryProps = {
  name: CategoryNameVO;
};

export class Category extends Entity<CategoryProps> {
  get name(): CategoryNameVO {
    return this.props.name;
  }

  updateName(name: CategoryNameVO): void {
    this.props.name = name;
    this.touch();
  }
}

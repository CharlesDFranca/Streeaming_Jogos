import { Entity } from "@shared/domain/entities/Entity/";
import type { PlanNameVO } from "../value-objects/PlanNameVO";
import type { MonthlyPriceVO } from "../value-objects/MonthlyPriceVO";
import type { ResolutionVO } from "../value-objects/ResolutionVO";

type PlanProps = {
  name: PlanNameVO;
  monthlyPrice: MonthlyPriceVO;
  maxResolution: ResolutionVO;
};

export class Plan extends Entity<PlanProps> {
  get name(): PlanNameVO {
    return this.props.name;
  }

  get monthlyPrice(): MonthlyPriceVO {
    return this.props.monthlyPrice;
  }

  get maxResolution(): ResolutionVO {
    return this.props.maxResolution;
  }

  updateName(name: PlanNameVO): void {
    this.props.name = name;
    this.touch();
  }

  updateMonthlyPrice(price: MonthlyPriceVO): void {
    this.props.monthlyPrice = price;
    this.touch();
  }

  updateMaxResolution(resolution: ResolutionVO): void {
    this.props.maxResolution = resolution;
    this.touch();
  }
}

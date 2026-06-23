import type { PlanRepository } from "@modules/subscriptions/repositories/PlanRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";

export type ListPlansInput = void;

export type ListPlansOutput = {
  id: string;
  name: string;
  monthlyPrice: number;
  maxResolution: string;
}[];


export class ListPlansUseCase
  implements UseCase<
    ListPlansInput,
    ListPlansOutput
  >
{
  constructor(
    private readonly planRepository: PlanRepository,
  ) {}

  async execute(): Promise<ListPlansOutput> {
    const plans = await this.planRepository.listAll();

    return plans.map((plan) => ({
      id: plan.id,
      name: plan.name.value,
      monthlyPrice: plan.monthlyPrice.value,
      maxResolution: plan.maxResolution.value,
    }));
  }
}
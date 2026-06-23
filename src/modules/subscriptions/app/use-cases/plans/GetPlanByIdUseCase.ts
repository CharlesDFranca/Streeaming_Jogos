import type { PlanRepository } from "@modules/subscriptions/repositories/PlanRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";

export type GetPlanByIdInput = {
  id: string;
};

export type GetPlanByIdOutput = {
  id: string;
  name: string;
  monthlyPrice: number;
  maxResolution: string;
};


export class GetPlanByIdUseCase
  implements UseCase<GetPlanByIdInput, GetPlanByIdOutput>
{
  constructor(
    private readonly planRepository: PlanRepository,
  ) {}

  async execute(
    input: GetPlanByIdInput,
  ): Promise<GetPlanByIdOutput> {
    const plan = await this.planRepository.findById(
      input.id,
    );

    if (!plan) {
      throw new Error("Plan not found");
    }

    return {
      id: plan.id,
      name: plan.name.value,
      monthlyPrice: plan.monthlyPrice.value,
      maxResolution: plan.maxResolution.value,
    };
  }
}
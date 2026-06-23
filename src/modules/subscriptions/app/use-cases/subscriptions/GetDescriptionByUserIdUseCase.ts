import type { SubscriptionRepository } from "@modules/subscriptions/repositories/SubscriptionRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";
import { AppDataSource } from "@shared/infra/database/AppSource/";
import { SubscriptionOrmEntity } from "@modules/subscriptions/infra/database/entities/SubscriptionEntity/";

export type GetSubscriptionByUserIdInput = {
  userId: string;
};

export type GetSubscriptionByUserIdOutput = {
  id: string;
  startDate: Date;
  endDate: Date;
  status: string;
  plan?: {
    id: string;
    name: string;
    monthlyPrice: number;
    maxResolution: string;
  };
}[];

export class GetSubscriptionByUserIdUseCase
  implements
    UseCase<
      GetSubscriptionByUserIdInput,
      GetSubscriptionByUserIdOutput
    >
{
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(
    input: GetSubscriptionByUserIdInput,
  ): Promise<GetSubscriptionByUserIdOutput> {
    const ormRepo = AppDataSource.getRepository(SubscriptionOrmEntity);

    // Find all subscriptions for the user
    const subscriptions = await ormRepo.find({
      where: { user: { id: input.userId } },
      relations: { plan: true },
    });

    return subscriptions.map(sub => ({
      id: sub.id,
      startDate: sub.startDate,
      endDate: sub.endDate,
      status: sub.status,
      plan: sub.plan ? {
        id: sub.plan.id,
        name: sub.plan.name,
        monthlyPrice: sub.plan.monthlyPrice,
        maxResolution: sub.plan.maxResolution,
      } : undefined
    }));
  }
}
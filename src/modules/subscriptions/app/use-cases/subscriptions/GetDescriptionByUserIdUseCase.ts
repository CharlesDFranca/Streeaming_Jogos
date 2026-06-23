import type { SubscriptionRepository } from "@modules/subscriptions/repositories/SubscriptionRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";

export type GetSubscriptionByUserIdInput = {
  userId: string;
};

export type GetSubscriptionByUserIdOutput = {
  id: string;
  startDate: Date;
  endDate: Date;
  status: string;
};

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
    const subscription =
      await this.subscriptionRepository.findByUserId(
        input.userId,
      );

    if (!subscription) {
      throw new Error(
        "Subscription not found",
      );
    }

    return {
      id: subscription.id,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      status: subscription.status.value,
    };
  }
}
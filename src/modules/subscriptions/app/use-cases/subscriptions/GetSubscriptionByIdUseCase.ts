import type { SubscriptionRepository } from "@modules/subscriptions/repositories/SubscriptionRepository/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";

export type GetSubscriptionByIdInput = {
  id: string;
};

export type GetSubscriptionByIdOutput = {
  id: string;
  startDate: Date;
  endDate: Date;
  status: string;
};

export class GetSubscriptionByIdUseCase
  implements
    UseCase<
      GetSubscriptionByIdInput,
      GetSubscriptionByIdOutput
    >
{
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(
    input: GetSubscriptionByIdInput,
  ): Promise<GetSubscriptionByIdOutput> {
    const subscription =
      await this.subscriptionRepository.findById(
        input.id,
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
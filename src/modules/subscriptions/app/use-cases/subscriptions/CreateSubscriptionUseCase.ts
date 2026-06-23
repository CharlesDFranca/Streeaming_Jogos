export type CreateSubscriptionInput = {
  startDate: Date;
  endDate: Date;
  status: string;
  userId: string,
  planId: string
};

export type CreateSubscriptionOutput = {
  id: string;
};

import { Subscription } from "@modules/subscriptions/entities/Subscription/";
import type { SubscriptionRepository } from "@modules/subscriptions/repositories/SubscriptionRepository/";
import { SubscriptionStatusVO } from "@modules/subscriptions/value-objects/SubscriptionStatusVO/";
import type { UseCase } from "@shared/app/use-cases/UseCase/";
import { randomUUID } from "crypto";

export class CreateSubscriptionUseCase
  implements
    UseCase<
      CreateSubscriptionInput,
      CreateSubscriptionOutput
    >
{
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(
    input: CreateSubscriptionInput,
  ): Promise<CreateSubscriptionOutput> {
    const subscription = new Subscription(
      randomUUID(),
      {
        userId: input.userId, planId: input.planId,
        startDate: input.startDate,
        endDate: input.endDate,
        status: new SubscriptionStatusVO(
          input.status,
        ),
      },
    );

    await this.subscriptionRepository.save(
      subscription,
    );

    return {
      id: subscription.id,
    };
  }
}
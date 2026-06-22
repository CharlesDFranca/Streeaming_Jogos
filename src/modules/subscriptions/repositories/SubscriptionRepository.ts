import { Subscription } from "../entities/Subscription";

export interface SubscriptionRepository {
  findById(id: string): Promise<Subscription | null>;
  findByUserId(userId: string): Promise<Subscription | null>;
  save(subscription: Subscription): Promise<void>;
  delete(id: string): Promise<void>;
}

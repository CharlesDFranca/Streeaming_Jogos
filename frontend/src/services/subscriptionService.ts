import api from './api';
import type { Subscription, CreateSubscriptionDTO } from '../types';

export const subscriptionService = {
  create: async (sub: CreateSubscriptionDTO): Promise<Subscription> => {
    const { data } = await api.post('/subscriptions', sub);
    return data;
  },

  getById: async (id: string): Promise<Subscription> => {
    const { data } = await api.get(`/subscriptions/${id}`);
    return data;
  },

  getByUserId: async (userId: string): Promise<Subscription[]> => {
    const { data } = await api.get(`/users/${userId}/subscriptions`);
    return data;
  },
};

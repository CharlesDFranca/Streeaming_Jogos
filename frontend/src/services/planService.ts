import api from './api';
import type { Plan } from '../types';

export const planService = {
  list: async (): Promise<Plan[]> => {
    const { data } = await api.get('/plans');
    return data;
  },

  getById: async (id: string): Promise<Plan> => {
    const { data } = await api.get(`/plans/${id}`);
    return data;
  },
};

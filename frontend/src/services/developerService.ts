import api from './api';
import type { Developer } from '../types';

export const developerService = {
  list: async (): Promise<Developer[]> => {
    const { data } = await api.get('/developers');
    return data;
  },

  getById: async (id: string): Promise<Developer> => {
    const { data } = await api.get(`/developers/${id}`);
    return data;
  },

  search: async (name: string): Promise<Developer[]> => {
    const { data } = await api.get('/developers/search', { params: { name } });
    return data;
  },
};

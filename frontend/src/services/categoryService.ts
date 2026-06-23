import api from './api';
import type { Category } from '../types';

export const categoryService = {
  list: async (): Promise<Category[]> => {
    const { data } = await api.get('/categories');
    return data;
  },

  getById: async (id: string): Promise<Category> => {
    const { data } = await api.get(`/categories/${id}`);
    return data;
  },
};

import api from './api';
import type { User, CreateUserDTO, UpdateUserDTO } from '../types';

export const userService = {
  create: async (user: CreateUserDTO): Promise<User> => {
    const { data } = await api.post('/users', user);
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  update: async (id: string, user: UpdateUserDTO): Promise<User> => {
    const { data } = await api.put(`/users/${id}`, user);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

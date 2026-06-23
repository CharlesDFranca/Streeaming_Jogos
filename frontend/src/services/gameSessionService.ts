import api from './api';
import type { GameSession, CreateGameSessionDTO } from '../types';

export const gameSessionService = {
  create: async (session: CreateGameSessionDTO): Promise<GameSession> => {
    const { data } = await api.post('/game-sessions', session);
    return data;
  },

  getById: async (id: string): Promise<GameSession> => {
    const { data } = await api.get(`/game-sessions/${id}`);
    return data;
  },

  update: async (id: string): Promise<GameSession> => {
    const { data } = await api.put(`/game-sessions/${id}`);
    return data;
  },

  getByUserId: async (userId: string): Promise<GameSession[]> => {
    const { data } = await api.get(`/users/${userId}/game-sessions`);
    return data;
  },
};

import api from './api';
import type { Game } from '../types';

export const gameService = {
  list: async (): Promise<Game[]> => {
    const { data } = await api.get('/games');
    return data;
  },

  getById: async (id: string): Promise<Game> => {
    const { data } = await api.get(`/games/${id}`);
    return data;
  },

  create: async (game: { title: string; description: string; minimumAge: number; releaseDate: string }): Promise<Game> => {
    const { data } = await api.post('/games', game);
    return data;
  },
};

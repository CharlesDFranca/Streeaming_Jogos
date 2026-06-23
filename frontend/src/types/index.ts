/* ===== Game Types ===== */
export interface Game {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  minimumAge: number;
  developerId: string;
  developer?: Developer;
  categories?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateGameDTO {
  title: string;
  description: string;
  minimumAge: number;
  releaseDate: string;
}

/* ===== Category Types ===== */
export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

/* ===== Developer Types ===== */
export interface Developer {
  id: string;
  name: string;
  headquartersCountry: string;
  officialWebsite: string;
  foundationYear: number;
  createdAt: string;
  updatedAt: string;
}

/* ===== User Types ===== */
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  name: string;
  email: string;
}

/* ===== Plan Types ===== */
export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  maxResolution: string;
  createdAt: string;
  updatedAt: string;
}

/* ===== Subscription Types ===== */
export interface Subscription {
  id: string;
  userId: string;
  planId?: string;
  startDate: string;
  endDate: string;
  status: string;
  plan?: Plan;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionDTO {
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  status: string;
}

/* ===== GameSession Types ===== */
export interface GameSession {
  id: string;
  userId: string;
  gameId: string;
  startDate: string;
  startTime: string;
  playedMinutes: number;
  averagePingMs: number;
  user?: User;
  game?: Game;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGameSessionDTO {
  startDate: string;
  startTime: string;
  playedMinutes: number;
  averagePingMs: number;
}

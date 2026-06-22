import { GameSession } from "../entities/GameSession";

export interface GameSessionRepository {
  findById(id: string): Promise<GameSession | null>;
  findByUserId(userId: string): Promise<GameSession[]>;
  save(session: GameSession): Promise<void>;
}

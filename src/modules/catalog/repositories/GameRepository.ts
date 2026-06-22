import { Game } from "../entities/Game";

export interface GameRepository {
  findById(id: string): Promise<Game | null>;
  findByTitle(title: string): Promise<Game | null>;
  listAll(): Promise<Game[]>;
  save(game: Game): Promise<void>;
  delete(id: string): Promise<void>;
}
import { Developer } from "../entities/Developer";

export interface DeveloperRepository {
  findById(id: string): Promise<Developer | null>;
  findByName(name: string): Promise<Developer | null>;
  listAll(): Promise<Developer[]>;
  save(developer: Developer): Promise<void>;
  delete(id: string): Promise<void>;
}

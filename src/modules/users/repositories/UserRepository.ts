import type { User } from "../entities/User";
import type { EmailVO } from "../value-objects/EmailVO";

export interface UserRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: EmailVO): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}

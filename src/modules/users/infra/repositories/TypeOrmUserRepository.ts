import { Repository } from "typeorm";
import type { UserRepository } from "../../repositories/UserRepository";
import type { UserOrmEntity } from "../database/entities/UserEntity";
import { UserMapper } from "../mappers/UserMapper";
import { User } from "../../entities/User";
import type { EmailVO } from "../../value-objects/EmailVO";

export class TypeOrmUserRepository implements UserRepository {
  private readonly ormRepo: Repository<UserOrmEntity>

  async update(user: User): Promise<User> {
    const updatedUser = await this.ormRepo.save(UserMapper.toPersistence(user));

    return UserMapper.toDomain(updatedUser);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.ormRepo.findOne({
      where: { id },
    });

    if (!user) return null;

    return UserMapper.toDomain(user);
  }

  async findByEmail(email: EmailVO): Promise<User | null> {
    const user = await this.ormRepo.findOne({
      where: { email: email.value },
    });

    if (!user) return null;

    return UserMapper.toDomain(user);
  }

  async save(user: User): Promise<User> {
    const persistence = UserMapper.toPersistence(user);

    const savedUser = await this.ormRepo.save(persistence);

    return UserMapper.toDomain(savedUser);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}

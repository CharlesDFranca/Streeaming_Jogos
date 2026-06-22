import { User } from "@modules/users/entities/User/";
import { UserOrmEntity } from "../database/entities/UserEntity";
import { NameVO } from "@modules/users/value-objects/NameVO/";
import { EmailVO } from "@modules/users/value-objects/EmailVO/";
import { HashedPasswordVO } from "@modules/users/value-objects/HashedPasswordVO/";

export class UserMapper {
  static toDomain(raw: UserOrmEntity): User {
    return new User(
      raw.id,
      {
        name: new NameVO(raw.name),
        email: new EmailVO(raw.email),
        password: new HashedPasswordVO(raw.password),
      },
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(domain: User): UserOrmEntity {
    const entity = new UserOrmEntity();

    entity.id = domain.id;
    entity.name = domain.name.value;
    entity.email = domain.email.value;
    entity.password = domain.password.value;

    return entity;
  }
}

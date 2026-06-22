import { Entity } from "@shared/domain/entities/Entity/";
import type { NameVO } from "../value-objects/NameVO";
import type { EmailVO } from "../value-objects/EmailVO";
import type { PasswordVO } from "../value-objects/PasswordVO";
import type { HashedPasswordVO } from "../value-objects/HashedPasswordVO";

type UserProps = {
  name: NameVO;
  email: EmailVO;
  password: PasswordVO | HashedPasswordVO;
};

export class User extends Entity<UserProps> {
  public get email(): EmailVO {
    return this.props.email;
  }

  public get name(): NameVO {
    return this.props.name;
  }

  public get password(): PasswordVO | HashedPasswordVO {
    return this.props.password;
  }

  public updateName(name: NameVO): void {
    this.props.name = name;
    this.touch();
  }

  public updateEmail(email: EmailVO): void {
    this.props.email = email;
    this.touch();
  }

  public updatePassword(password: HashedPasswordVO): void {
    this.props.password = password;
    this.touch();
  }
}

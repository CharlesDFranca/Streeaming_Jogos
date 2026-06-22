export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserOutput = {
  id: string;
};

import type { UseCase } from "@shared/app/use-cases/UseCase/";
import { randomUUID } from "crypto";
import type { UserRepository } from "../../repositories/UserRepository";
import { EmailVO } from "../../value-objects/EmailVO";
import { NameVO } from "../../value-objects/NameVO";
import { PasswordVO } from "../../value-objects/PasswordVO";
import { HashedPasswordVO } from "../../value-objects/HashedPasswordVO";
import { User } from "../../entities/User";

export class CreateUserUseCase implements UseCase<
  CreateUserInput,
  CreateUserOutput
> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const emailVO = new EmailVO(input.email);

    const existing = await this.userRepository.findByEmail(emailVO);

    if (existing) {
      throw new Error("User already exists");
    }

    const passwordVO = new PasswordVO(input.password);

    // aqui você normalmente teria um service de hash
    const hashedPassword = new HashedPasswordVO(
      await this.hashPassword(passwordVO.value),
    );

    const user = new User(randomUUID(), {
      name: new NameVO(input.name),
      email: emailVO,
      password: hashedPassword,
    });

    const saved = await this.userRepository.save(user);

    return {
      id: saved.id,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    // placeholder (bcrypt aqui)
    return "hashed_" + password;
  }
}

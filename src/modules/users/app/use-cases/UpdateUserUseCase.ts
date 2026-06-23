import type { UseCase } from "@shared/app/use-cases/UseCase/";
import type { UserRepository } from "../../repositories/UserRepository";
import { NameVO } from "../../value-objects/NameVO";
import { EmailVO } from "../../value-objects/EmailVO";

export type UpdateUserInput = {
  id: string;
  name?: string;
  email?: string;
};

export type UpdateUserOutput = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UpdateUserUseCase implements UseCase<
  UpdateUserInput,
  UpdateUserOutput
> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new Error("User not found");
    }

    if (input.name) {
      user.updateName(new NameVO(input.name));
    }

    if (input.email) {
      const emailVO = new EmailVO(input.email);

      const existing = await this.userRepository.findByEmail(emailVO);

      if (existing && existing.id !== user.id) {
        throw new Error("Email already in use");
      }

      user.updateEmail(emailVO);
    }

    const updated = await this.userRepository.update(user);

    return {
      id: updated.id,
      name: updated.name.value,
      email: updated.email.value,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  }
}

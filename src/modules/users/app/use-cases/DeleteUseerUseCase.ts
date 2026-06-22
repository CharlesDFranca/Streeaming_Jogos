import type { UseCase } from "@shared/app/use-cases/UseCase/";
import type { UserRepository } from "../../repositories/UserRepository";

export type DeleteUserInput = {
  id: string;
};

export type DeleteUserOutput = void;

export class DeleteUserUseCase implements UseCase<
  DeleteUserInput,
  DeleteUserOutput
> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: DeleteUserInput): Promise<void> {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(input.id);
  }
}

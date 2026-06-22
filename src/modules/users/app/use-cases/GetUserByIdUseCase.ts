import type { UseCase } from "@shared/app/use-cases/UseCase/";
import type { UserRepository } from "../../repositories/UserRepository";

export type GetUserByIdInput = {
  id: string;
};

export type GetUserByIdOutput = {
  id: string;
  name: string;
  email: string;
};

export class GetUserByIdUseCase implements UseCase<
  GetUserByIdInput,
  GetUserByIdOutput
> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: GetUserByIdInput): Promise<GetUserByIdOutput> {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      name: user.name.value,
      email: user.email.value,
    };
  }
}

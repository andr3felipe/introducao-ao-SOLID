import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const findUserAdmin = this.usersRepository.findById(user_id);

    try {
      if (!findUserAdmin.admin) {
        throw new Error("This user is not a admin!");
      }
    } catch (error) {
      error.statusCode = 400;
      throw error;
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };

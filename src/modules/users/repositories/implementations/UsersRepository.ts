import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const createUser = new User();

    Object.assign(createUser, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(createUser);

    return createUser;
  }

  findById(id: string): User | undefined {
    const findUserById = this.users.find((user) => user.id === id);

    try {
      if (!findUserById) {
        throw new Error("User not found!");
      }
    } catch (error) {
      error.statusCode = 400;
      throw error;
    }

    return findUserById;
  }

  findByEmail(email: string): User | undefined {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }

  turnAdmin(receivedUser: User): User {
    const findUserById = this.users.find((user) => user.id === receivedUser.id);

    findUserById.admin = true;

    return findUserById;
  }

  list(): User[] {
    const all = this.users;

    return all;
  }
}

export { UsersRepository };

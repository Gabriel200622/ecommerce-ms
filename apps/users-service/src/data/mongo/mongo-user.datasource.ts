import { UserDto, UserEntity } from "@bigecommerce/utils";
import { UserDataSource } from "./types";
import { User } from "./models/User";

export class MongoUserDataSource implements UserDataSource {
  async create(userDto: UserDto): Promise<UserEntity | undefined> {
    const user = await User.build(userDto);

    const newUser = new UserEntity(user);

    return newUser;
  }

  async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await User.findOne({ email });

    if (!user) return undefined;

    const userByEmail = new UserEntity(user);

    return userByEmail;
  }

  async getUserByUsername(username: string): Promise<UserEntity | undefined> {
    const user = await User.findOne({ username });

    if (!user) return undefined;

    const userByUsername = new UserEntity(user);

    return userByUsername;
  }

  async getUserById(id: string): Promise<UserEntity | undefined> {
    const user = await User.findById(id);

    if (!user) return undefined;

    const userById = new UserEntity(user);

    return userById;
  }
}

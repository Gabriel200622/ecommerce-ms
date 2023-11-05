import { UserDto, UserEntity } from "@bigecommerce/utils";

export interface UserDataSource {
  create(userDto: UserDto): Promise<UserEntity | undefined>;
  getUserByEmail(email: string): Promise<UserEntity | undefined>;
  getUserByUsername(username: string): Promise<UserEntity | undefined>;
  getUserById(id: string): Promise<UserEntity | undefined>;
}

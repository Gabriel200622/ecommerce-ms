import { UserDtoProps } from "../interfaces";
import { BaseDto } from "./base.dto";

export class UserDto extends BaseDto<UserDtoProps> {
  id?: string;
  name: string;
  username: string;
  email: string;
  userImageUrl?: string;
  userImageId?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: UserDtoProps) {
    super();
    const {
      id,
      name,
      username,
      email,
      userImageUrl,
      userImageId,
      createdAt,
      updatedAt,
    } = this.validateProps(props, ["name", "username", "email"]);

    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.userImageUrl = userImageUrl;
    this.userImageId = userImageId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

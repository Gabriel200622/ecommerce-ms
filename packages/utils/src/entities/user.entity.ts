import { UserEntityProps } from "../interfaces";
import { BaseEntity } from "./base.entity";

export class UserEntity extends BaseEntity<UserEntityProps> {
  public id: string;
  public name: string;
  public username: string;
  public email: string;
  public userImageId: string | null;
  public userImageUrl: string | null;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: UserEntityProps) {
    super();

    this.validateProps(props, [
      "id",
      "name",
      "username",
      "email",
      "createdAt",
      "updatedAt",
    ]);

    const {
      id,
      name,
      username,
      email,
      userImageId,
      userImageUrl,
      createdAt,
      updatedAt,
    } = props;

    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.userImageId = userImageId;
    this.userImageUrl = userImageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

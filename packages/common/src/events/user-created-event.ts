import { Subjects } from "./subjects";

export interface UserCreatedEvent {
  subject: Subjects.UserCreated;
  data: {
    id: string;
    name: string;
    username: string;
    userImageId: string | null;
    userImageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

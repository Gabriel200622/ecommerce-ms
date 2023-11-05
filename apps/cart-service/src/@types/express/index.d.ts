import { UserEntity } from "@bigecommerce/utils";

declare global {
  namespace Express {
    interface Request {
      user?: UserEntity;
    }
  }
}

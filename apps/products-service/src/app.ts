import mongoose from "mongoose";
import { Server } from "@bigecommerce/common";
import { envs } from "./config/envs";
import { configCors } from "./config/cors";
import { AppRoutes } from "./presentation/routes";
import { natsWrapper } from "./modules/nats";

// Events
import { UserCreatedListener } from "./events/listeners/user-created-listener";

const main = async () => {
  new Server({
    port: envs.PORT,
    configCors: configCors,
    routes: AppRoutes.routes,
  });

  await mongoose.connect(envs.DATABASE_URL);
  console.log(`🚀 Database connected`);

  await natsWrapper.connect();

  new UserCreatedListener(natsWrapper.client).listen();
};

(async () => {
  await main();
})();

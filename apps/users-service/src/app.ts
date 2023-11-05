import mongoose from "mongoose";
import { Server } from "@bigecommerce/common";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { configCors } from "./config/cors";
import { natsWrapper } from "./modules/nats";

const main = async () => {
  new Server({
    port: envs.PORT,
    configCors: configCors,
    routes: AppRoutes.routes,
  });

  await mongoose.connect(envs.DATABASE_URL);
  console.log(`🚀 Database connected`);

  natsWrapper.connect();
};

(async () => {
  main();
})();

import axios from "axios";
import { envs } from "@/config/envs";

export const axiosClient = axios.create({
  baseURL: `${envs.NEXT_PUBLIC_SERVER_URL}/api`,
  withCredentials: true,
});

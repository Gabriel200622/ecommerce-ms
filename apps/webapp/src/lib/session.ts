import { cookies } from "next/headers";
import { axiosClient } from "./axios";
import { IDataAxios } from "@/interfaces";

export const getCurrentUser = async () => {
  try {
    const cookieStore = cookies();

    const token = cookieStore.get("token");

    const { data }: IDataAxios = await axiosClient("/user/", {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });

    return { user: data.data };
  } catch (error) {
    return { response: null };
  }
};

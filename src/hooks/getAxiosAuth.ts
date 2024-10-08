import { API_URL } from "@/constants";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getServerSideAxios = () => {
  const defaultOptions = {
    baseURL: API_URL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    async (config) => {
      const session = await getServerSession(authOptions);
      const controller = new AbortController();

      if (session?.user?.token === undefined) {
        controller.abort("Token is invalid");
      }

      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${session?.user?.token}`;
      }

      return {
        ...config,
        signal: controller.signal,
      };
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (
        error?.response?.status === 403 ||
        error?.response?.data.message?.includes("Forbidden")
      ) {
        redirect("?sessionExpired=true");
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

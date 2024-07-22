"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { axiosAuth } from "../lib/axios";
import { useRefreshToken } from "./useRefreshToken";
import { useAppDispatch } from ".";
import { action } from "@/redux";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        const controller = new AbortController();

        if (session?.user.token === undefined) {
          controller.abort("Token is undefined");
        }

        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user.token}`;
        }
        return {
          ...config,
          signal: controller.signal,
        };
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        // const prevRequest = error.config;
        // if (error.response.status === 401 && !prevRequest.sent) {
        //   prevRequest.sent = true;
        //   await refreshToken();
        //   prevRequest.headers["Authorization"] =
        //     `Bearer ${session?.user.token}`;
        //   return axiosAuth(prevRequest);
        // }
        // return Promise.reject(error);
        if (
          error?.response?.status === 403 ||
          error?.response?.data.message.includes("Forbidden")
        ) {
          dispatch(action.authentication.setSessionExpired(true));
          // signOut();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [refreshToken, session, dispatch]);

  return axiosAuth;
};

export default useAxiosAuth;

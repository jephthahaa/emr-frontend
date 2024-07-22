import { getServerSideAxios } from "@/hooks/getAxiosAuth";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import axios from "@/lib/axios";
import { AxiosInstance } from "axios";
import { doctorsRoutes } from "./doctors";
import { SERVICE_MODE } from "@/constants";
import {
  IApiResponse,
  IBroadcast,
  IGetActiveConsultation,
  IGetDoctorDetails,
  IMessege,
  IPaginatedApiResponse,
  IPostPayment,
  IPostPaymentVerify,
  IUpdateDoctor,
} from "@/types";
import { patientsRoutes } from "./patients";
import { adminRoutes } from "./admin";

const useZomujoApi = (server = false) => {
  let authAxios: AxiosInstance;

  if (!server) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    authAxios = useAxiosAuth();
  } else {
    authAxios = getServerSideAxios();
  }

  const auth = {
    doctors: {
      login: async () => {
        const response = await axios.get("/auth/doctors/login");
        return response.data;
      },
      register: async (data: FormData) => {
        const response = await axios.post("/auth/doctors/register", data);
        return response.data;
      },
    },
    patients: {},
  };

  const doctors = doctorsRoutes(authAxios);
  const patients = patientsRoutes(authAxios);
  const admin = adminRoutes(authAxios);

  const shared = {
    getChatMessages: async (userId: string) => {
      const response = await authAxios.get<IApiResponse<IMessege[]>>(
        `/${SERVICE_MODE.toLowerCase()}s/messages/${userId}`,
      );
      return response.data;
    },
    getBroadcasts: async ({
      limit = 6,
      page = 1,
    }: {
      limit?: number;
      page?: number;
    }) => {
      const response = await authAxios.get<IPaginatedApiResponse<IBroadcast>>(
        `/${SERVICE_MODE.toLowerCase()}s/broadcasts?limit=${limit}&page=${page}`,
      );
      return response.data;
    },
    getActiveConsultation: async () => {
      const response = await authAxios.get<IGetActiveConsultation>(
        `/${SERVICE_MODE.toLowerCase()}s/consultations/status`,
      );
      return response.data;
    },
    getUserDetails: async () => {
      const response = await authAxios.get<IGetDoctorDetails>(
        `/${SERVICE_MODE.toLowerCase()}s/me`,
      );
      return response.data.data;
    },
    patchUserDetails: async (data: IUpdateDoctor) => {
      const response = await authAxios.patch<IGetDoctorDetails>(
        `/${SERVICE_MODE.toLowerCase()}s/me`,
        data,
      );
      return response.data.data;
    },
    deleteAccount: async () => {
      const response = await authAxios.delete(
        `/${SERVICE_MODE.toLowerCase()}s/delete-account`,
      );
      return response.data;
    },
    deleteProfilePicture: async () => {
      const response = await authAxios.delete(
        `/${SERVICE_MODE.toLowerCase()}s/remove-profile-picture`,
      );
      return response.data;
    },
    uploadProfilePicture: async (data: FormData) => {
      const response = await authAxios.post(
        `/${SERVICE_MODE.toLowerCase()}s/upload-profile-picture`,
        data,
      );
      return response.data;
    },
    resetPassword: async (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword?: string;
      ConfirmPassword?: string;
    }) => {
      const response = await authAxios.post(
        `/${SERVICE_MODE.toLowerCase()}s/reset-password`,
        data,
      );
      return response.data;
    },
    payments: {
      pay: async ({
        amount,
        currency = "GHS",
      }: {
        amount: number;
        currency: string;
      }) => {
        const response = await authAxios.post<IPostPayment>("/payments/pay", {
          amount,
          currency,
        });
        return response.data;
      },
      verify: async (data: { reference: string; doctorId: string }) => {
        const response = await authAxios.post<IPostPaymentVerify>(
          "/payments/verify",
          data,
        );
        return response.data;
      },
    },
  };

  return {
    auth,
    shared,
    doctors,
    patients,
    admin,
  };
};

export default useZomujoApi;

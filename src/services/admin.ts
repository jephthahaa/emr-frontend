import {
  IApiResponse,
  IAppointment,
  IBroadcast,
  IDoctor,
  ILog,
  IMedicine,
  IPaginatedApiResponse,
  IPatient,
  ISymptom,
  ITransaction,
} from "@/types";
import { createQueryString } from "@/utils";
import { AxiosInstance } from "axios";

export function adminRoutes(authAxios: AxiosInstance) {
  return {
    getTotalUsers: async () => {
      const response =
        await authAxios.get<IApiResponse<number>>("/admin/total-users");
      return response.data;
    },
    getTotalDoctors: async () => {
      const response = await authAxios.get<IApiResponse<number>>(
        "/admin/total-doctors",
      );
      return response.data;
    },
    getTotalPatients: async () => {
      const response = await authAxios.get<IApiResponse<number>>(
        "/admin/total-patients",
      );
      return response.data;
    },
    getRemovedUsers: async () => {
      const response = await authAxios.get("/admin/total-removed-users");
      return response.data;
    },
    getPendingUsers: async () => {
      const response = await authAxios.get("/admin/total-pending-users");
      return response.data;
    },
    getTotalAppointments: async () => {
      const response = await authAxios.get<
        IApiResponse<{
          total: number;
          appointments: {
            date: string;
            count: number;
          }[];
        }>
      >("/admin/total-appointments");
      return response.data;
    },
    getDeclinedAppointments: async () => {
      const response = await authAxios.get(
        "/admin/total-declined-appointments",
      );
      return response.data;
    },
    getPendingAppointments: async () => {
      const response = await authAxios.get("/admin/total-pending-appointments");
      return response.data;
    },
    getAppointments: async ({
      limit = 3,
      page = 1,
      ...data
    }: {
      limit?: number;
      page?: number;
      search?: string;
      sort?: string;
      status?: string;
      type?: string;
    }) => {
      const query = createQueryString({
        limit,
        page,
        ...data,
      });
      const response = await authAxios.get<IPaginatedApiResponse<IAppointment>>(
        `/admin/appointments?${query}`,
      );
      return response.data;
    },
    getActivePatients: async () => {
      const response = await authAxios.get("/admin/total-active-patients");
      return response.data;
    },
    getDeletedPatients: async () => {
      const response = await authAxios.get("/admin/total-deleted-patients");
      return response.data;
    },
    getAllPatients: async ({
      limit = 3,
      page = 1,
      ...data
    }: {
      limit?: number;
      page?: number;
      search?: string;
      gender?: string;
      sort?: string;
      consult?: string;
    }) => {
      const query = createQueryString({
        limit,
        page,
        ...data,
      });
      const response = await authAxios.get<IPaginatedApiResponse<IPatient>>(
        `/admin/patients?${query}`,
      );
      return response.data;
    },
    getPatient: async (id: string) => {
      const response = await authAxios.get<IApiResponse<IPatient>>(
        `/admin/patients/${id}`,
      );
      return response.data;
    },
    getPatientLogs: async (
      id: string,
      {
        limit = 3,
        page = 1,
        search = "",
      }: {
        limit?: number;
        page?: number;
        search?: string;
      },
    ) => {
      const response = await authAxios.get<IPaginatedApiResponse<ILog>>(
        `/admin/patients/${id}/logs?limit=${limit}&page=${page}&search=${search}`,
      );
      return response.data;
    },
    getActiveDoctors: async () => {
      const response = await authAxios.get("/admin/total-active-doctors");
      return response.data;
    },
    getPendingDoctors: async () => {
      const response = await authAxios.get("/admin/total-pending-doctors");
      return response.data;
    },
    getAllDoctors: async ({
      limit = 3,
      page = 1,
      ...data
    }: {
      limit?: number;
      page?: number;
      search?: string;
      sort?: string;
      status?: string;
      consult?: string;
    }) => {
      const query = createQueryString({
        limit,
        page,
        ...data,
      });
      const response = await authAxios.get<IPaginatedApiResponse<IDoctor>>(
        `/admin/doctors?${query}`,
      );
      return response.data;
    },
    getDoctor: async (id: string) => {
      const response = await authAxios.get<IApiResponse<IDoctor>>(
        `/admin/doctors/${id}`,
      );
      return response.data;
    },
    getDoctorLogs: async (
      id: string,
      {
        limit = 3,
        page = 1,
        search = "",
      }: {
        limit?: number;
        page?: number;
        search?: string;
      },
    ) => {
      const response = await authAxios.get<IApiResponse<ILog[]>>(
        `/admin/doctors/${id}/logs?limit=${limit}&page=${page}&search=${search}`,
      );
      return response.data;
    },
    acceptDoctorVerification: async (id: string) => {
      const response = await authAxios.patch(`/admin/verify-doctor/${id}`);
      return response.data;
    },
    declineDoctorVerification: async (id: string) => {
      const response = await authAxios.patch(`/admin/decline-doctor/${id}`);
      return response.data;
    },
    getDailyActiveUsers: async () => {
      const response = await authAxios.get<
        IApiResponse<
          {
            date: string;
            count: string;
          }[]
        >
      >("/admin/daily-active-users");
      return response.data;
    },
    getMonthlyNewUsers: async () => {
      const response = await authAxios.get<
        IApiResponse<
          {
            month: string;
            count: string;
          }[]
        >
      >("/admin/monthly-new-users");
      return response.data;
    },
    getTransactions: async ({
      limit = 6,
      page = 1,
      ...data
    }: {
      limit?: number;
      page?: number;
      search?: string;
      sort?: string;
    }) => {
      const query = createQueryString({
        limit,
        page,
        ...data,
      });
      const response = await authAxios.get<IPaginatedApiResponse<ITransaction>>(
        `/admin/transactions?${query}`,
      );
      return response.data;
    },
    getTransaction: async (id: string) => {
      const response = await authAxios.get<IApiResponse<ITransaction>>(
        `/admin/transactions/${id}`,
      );
      return response.data;
    },
    getTotalAmount: async () => {
      const response = await authAxios.get("/admin/total-amount");
      return response.data;
    },
    getRecentTransactions: async () => {
      const response = await authAxios.get("/admin/recent-transactions");
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
        `/admin/broadcasts?limit=${limit}&page=${page}`,
      );
      return response.data;
    },
    medicines: {
      getAllMedicine: async ({
        type = "",
        limit = 20,
        page = 1,
        ...data
      }: {
        limit?: number;
        page?: number;
        search?: string;
        sort?: string;
        type?: string;
      }) => {
        const query = createQueryString({
          limit,
          page,
          ...data,
        });
        const response = await authAxios.get<IPaginatedApiResponse<IMedicine>>(
          `/admin/medicines?${query}`,
        );
        return response.data;
      },
      postMedicine: async (data: Omit<IMedicine, "id">) => {
        const response = await authAxios.post("/admin/medicines", data);
        return response.data;
      },
      putMedicine: async (id: string, data: Omit<IMedicine, "id">) => {
        const response = await authAxios.put(`/admin/medicines/${id}`, data);
        return response.data;
      },
      deleteMedicine: async (id: string) => {
        const response = await authAxios.delete(`/admin/medicines/${id}`);
        return response.data;
      },
      populateTable: async () => {
        const response = await authAxios.post("/admin/populate-medicines");
        return response.data;
      },
    },
    symptoms: {
      getAllSymptom: async ({
        limit = 20,
        page = 1,
        ...data
      }: {
        limit?: number;
        page?: number;
        search?: string;
        sort?: string;
        type?: string;
      }) => {
        const query = createQueryString({
          limit,
          page,
          ...data,
        });
        const response = await authAxios.get<IPaginatedApiResponse<ISymptom>>(
          `/admin/symptoms?${query}`,
        );
        return response.data;
      },
      postSymptom: async (data: Omit<ISymptom, "id">) => {
        const response = await authAxios.post("/admin/symptoms", data);
        return response.data;
      },
      putSymptom: async (id: string, data: Omit<ISymptom, "id">) => {
        const response = await authAxios.put(`/admin/symptoms/${id}`, data);
        return response.data;
      },
      deleteSymptom: async (id: string) => {
        const response = await authAxios.delete(`/admin/symptoms/${id}`);
        return response.data;
      },
      populateTable: async () => {
        const response = await authAxios.post("/admin/populate-symptoms");
        return response.data;
      },
    },
    icds: {
      getAllIcd: async ({
        type = "",
        limit = 20,
        page = 1,
        ...data
      }: {
        limit?: number;
        page?: number;
        search?: string;
        sort?: string;
        type?: string;
      }) => {
        const query = createQueryString({
          limit,
          page,
          ...data,
        });
        const response = await authAxios.get<IPaginatedApiResponse<ISymptom>>(
          `/admin/icds?${query}`,
        );
        return response.data;
      },
      postIcd: async (data: Omit<IMedicine, "id">) => {
        const response = await authAxios.post("/admin/icds", data);
        return response.data;
      },
      putIcd: async (id: string, data: Omit<IMedicine, "id">) => {
        const response = await authAxios.put(`/admin/icds/${id}`, data);
        return response.data;
      },
      deleteIcd: async (id: string) => {
        const response = await authAxios.delete(`/admin/icds/${id}`);
        return response.data;
      },
      populateTable: async () => {
        const response = await authAxios.post("/admin/populate-icds");
        return response.data;
      },
    },
    helpSupport: {
      getAllIssues: async ({
        type = "",
        limit = 20,
        page = 1,
        ...data
      }: {
        limit?: number;
        page?: number;
        search?: string;
        sort?: string;
        type?: string;
        userType?: string;
      }) => {
        const query = createQueryString({
          limit,
          page,
          ...data,
        });
        const response = await authAxios.get(`/admin/issues?${query}`);
        return response.data;
      },
      getAllFeedback: async ({
        limit = 20,
        page = 1,
        ...data
      }: {
        limit?: number;
        page?: number;
        search?: string;
        sort?: string;
        type?: string;
        userType?: string;
      }) => {
        const query = createQueryString({
          limit,
          page,
          ...data,
        });
        const response = await authAxios.get(`/admin/feedback?${query}`);
        return response.data;
      },
      postToggleIssue: async (id: string) => {
        const response = await authAxios.patch(`/admin/toggle-issue/${id}`);
        return response.data;
      },
    },
    settings: {
      uploadProfilePicture: async (data: FormData) => {
        const response = await authAxios.post(
          "/admin/upload-profile-picture",
          data,
        );
        return response.data;
      },
      removeProfilePicture: async () => {
        const response = await authAxios.delete(
          "/admin/remove-profile-picture",
        );
        return response.data;
      },
      updateName: async (data: { name: string }) => {
        const response = await authAxios.patch("/admin/update-name", data);
        return response.data;
      },
      toggleNotifications: async (data: {
        status: boolean;
        messages: boolean;
        appointments: boolean;
      }) => {
        const response = await authAxios.patch(
          "/admin/toggle-notifications",
          data,
        );
        return response.data;
      },
      resetPassword: async () => {
        const response = await authAxios.patch("/admin/reset-password");
        return response.data;
      },
    },
  };
}

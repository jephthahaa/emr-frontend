import {
  IApiResponse,
  IAppointmentRequest,
  IDoctor,
  IGetAppointmentSlotData,
  IGetCheckReview,
  IGetUpcomingAppointments,
  IMedicalRecordRequest,
  IPaginatedApiResponse,
  IPatient,
  IPatientGetAppointmentRequest,
} from "@/types";
import { IReviewSchema } from "@/types/schema";
import { createQueryString } from "@/utils";
import { AxiosInstance } from "axios";

export function patientsRoutes(authAxios: AxiosInstance) {
  return {
    getPatientDetails: async () => {
      const response =
        await authAxios.get<IApiResponse<IPatient>>("/patients/me");
      return response.data;
    },
    getAssingedDoctors: async ({
      limit = 3,
      page = 1,
      search = "",
    }: {
      limit?: number;
      page?: number;
      search?: string;
    }) => {
      const response = await authAxios.get<IPaginatedApiResponse<IDoctor>>(
        `/patients/doctors?limit=${limit}&page=${page}&search=${search}`,
      );
      return response.data;
    },
    getDoctorDetails: async (id: string) => {
      const response = await authAxios.get<IApiResponse<IDoctor>>(
        `/patients/doctors/${id}`,
      );
      return response.data;
    },
    getTopDoctors: async ({
      limit = 13,
      page = 1,
      search = "",
    }: {
      limit?: number;
      page?: number;
      search?: string;
    }) => {
      const response = await authAxios.get<IPaginatedApiResponse<IDoctor>>(
        `/patients/top-doctors?limit=${limit}&page=${page}&search=${search}`,
      );
      return response.data;
    },
    getSuggestedDoctors: async ({
      limit = 13,
      page = 1,
      search = "",
    }: {
      limit?: number;
      page?: number;
      search?: string;
    }) => {
      const response = await authAxios.get<IPaginatedApiResponse<IDoctor>>(
        `/patients/suggested-doctors?limit=${limit}&page=${page}&search=${search}`,
      );
      return response.data;
    },

    getFindDoctor: async (data: {
      limit?: number;
      page?: number;
      search?: string;
      minPrice?: number;
      maxPrice?: number;
      minStar?: number;
      maxStar?: number;
      speciality?: string;
      location?: string;
      gender?: string;
      language?: string;
    }) => {
      const query = createQueryString(data);
      const response = await authAxios.get<IPaginatedApiResponse<IDoctor>>(
        `/patients/find-doctors?${query}`,
      );
      return response.data;
    },
    getFavouriteDoctors: async (data: {
      limit?: number;
      page?: number;
      search?: string;
      minPrice?: number;
      maxPrice?: number;
      minStar?: number;
      maxStar?: number;
      speciality?: string;
      sort?: string;
    }) => {
      const query = createQueryString(data);
      const response = await authAxios.get<IPaginatedApiResponse<IDoctor>>(
        `/patients/favourites?${query}`,
      );
      return response.data;
    },
    postToggleFavouriteDoctor: async (id: string) => {
      const response = await authAxios.post("/patients/favourites/toggle", {
        doctorId: id,
      });
      return response.data;
    },
    removeFavouriteDoctor: async () => {
      const response = await authAxios.delete("/patients/favourites/remove");
      return response.data;
    },

    viewMedicalHistory: async () => {
      const response = await authAxios.get("/patients/medical-history");
      return response.data;
    },
    scheduleAppointment: async () => {
      const response = await authAxios.post("/patients/schedule-appointment");
      return response.data;
    },
    cancelAppointment: async (id: string) => {
      const response = await authAxios.delete(
        `/patients/appointments/${id}/cancel`,
      );
      return response.data;
    },
    getPastAppointments: async () => {
      const response = await authAxios.get<IGetUpcomingAppointments>(
        "/patients/appointments/past",
      );
      return response.data;
    },
    getUpcomingAppointments: async () => {
      const response = await authAxios.get<IGetUpcomingAppointments>(
        "/patients/appointments/upcoming",
      );
      return response.data;
    },
    getAppointmentRequests: async () => {
      const response = await authAxios.get<
        IPaginatedApiResponse<IPatientGetAppointmentRequest>
      >("/patients/appointments/requests");
      return response.data;
    },
    postAppointmentRequest: async (data: {
      slotId: string;
      reason: string;
      notes: string;
    }) => {
      const response = await authAxios.post<IApiResponse<IAppointmentRequest>>(
        "/patients/appointments/requests",
        data,
      );
      return response.data;
    },
    patchCancelAppointmentRequest: async (id: number) => {
      const response = await authAxios.patch(
        `/patients/appointments/requests/cancel/${id}`,
      );
      return response.data;
    },
    patchRescheduleAppointmentRequest: async (data: {
      requestId: number;
      slotId: string;
    }) => {
      const response = await authAxios.patch(
        `/patients/appointments/requests/reschedule/${data.requestId}`,
        data,
      );
      return response.data;
    },
    getAppointmentSlots: async (id: string) => {
      const response = await authAxios.get<
        IPaginatedApiResponse<IGetAppointmentSlotData>
      >(`/patients/appointments/slots/${id}`);
      return response.data;
    },
    getRecordsRequests: async ({
      limit = 3,
      page = 1,
      search = "",
    }: {
      limit?: number;
      page?: number;
      search?: string;
    }) => {
      const response = await authAxios.get<
        IPaginatedApiResponse<IMedicalRecordRequest>
      >(
        `/patients/records/requests?limit=${limit}&page=${page}&search=${search}`,
      );
      return response.data;
    },
    acceptRecordsRequest: async (data: { requestId: string }) => {
      const response = await authAxios.patch(
        "/patients/records/requests/accept",
        data,
      );
      return response.data;
    },
    toggleRecordsRequest: async (data: { requestId: string }) => {
      const response = await authAxios.patch(
        "/patients/records/requests/toggle",
        data,
      );
      return response.data;
    },

    addLabPicture: async (id: string) => {
      const response = await authAxios.get(`/patients/${id}/add-lab`);
      return response.data;
    },
    checkPendingReviews: async () => {
      const response = await authAxios.get<IGetCheckReview>(
        "/patients/reviews/check",
      );
      return response.data;
    },
    patchReview: async (id: string, data: IReviewSchema) => {
      const response = await authAxios.patch(`/patients/reviews/${id}`, data);
      return response.data;
    },
    settings: {
      editProfile: async () => {
        const response = await authAxios.patch("/patients/profile");
        return response.data;
      },
      requestPasswordReset: async () => {
        const response = await authAxios.post("/patients/password-reset");
        return response.data;
      },
      editProfileInformation: async () => {
        const response = await authAxios.patch("/patients/update-profile");
        return response.data;
      },
      viewProfile: async () => {
        const response = await authAxios.get("/patients/profile");
        return response.data;
      },
      removeProfilePicture: async () => {
        const response = await authAxios.delete(
          "/patients/remove-profile-picture",
        );
        return response.data;
      },
      uploadProfilePicture: async () => {
        const response = await authAxios.post(
          "/patients/upload-profile-picture",
        );
        return response.data;
      },
      deleteAccount: async () => {
        const response = await authAxios.delete("/patients/delete");
        return response.data;
      },
    },
  };
}

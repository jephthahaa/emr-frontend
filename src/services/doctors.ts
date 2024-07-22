import {
  IApiResponse,
  IAppointmentSlotData,
  IConsultationNote,
  IDiagnosis,
  IGetAppointmentRequests,
  IGetAppointmentSlots,
  IGetDoctorDetails,
  IGetMedicines,
  IGetSymptoms,
  IGetUpcomingAppointments,
  ILab,
  IPaginatedApiResponse,
  IPatient,
  IPostAppointmentSlot,
  IPostStartConsultation,
  IPrescription,
  IUser,
} from "@/types";
import { IUpdatePatientRecord } from "@/types/schema";
import { createQueryString } from "@/utils";
import { AxiosInstance } from "axios";

export function doctorsRoutes(authAxios: AxiosInstance) {
  return {
    getPatients: async ({
      limit = 3,
      page = 1,
      ...data
    }: {
      limit?: number;
      page?: number;
      search?: string;
      gender?: string;
      sort?: string;
    }) => {
      const query = createQueryString({
        limit,
        page,
        ...data,
      });
      const response = await authAxios.get<IPaginatedApiResponse<IPatient>>(
        `/doctors/patients?${query}`,
      );
      return response.data;
    },
    getDoctorDetails: async () => {
      const response = await authAxios.get<IGetDoctorDetails>("/doctors/me");
      return response.data.data;
    },
    getRecentChats: async () => {
      const response = await authAxios.get<IApiResponse<IUser[]>>(
        "/doctors/messages/recent",
      );
      return response.data.data;
    },

    appointments: {
      getAppointments: async () => {
        const response = await authAxios.get("/doctors/appointments");
        return response.data;
      },
      getUpcomingAppointments: async (
        date = new Date().toISOString().split("T")[0],
      ) => {
        const response = await authAxios.get<IGetUpcomingAppointments>(
          `/doctors/appointments/upcoming?date=${date}`,
        );
        return response.data;
      },
      postAppointmentSlot: async (apointmentSlotData: IAppointmentSlotData) => {
        const response = await authAxios.post<IPostAppointmentSlot>(
          "/doctors/appointments/slots",
          apointmentSlotData,
        );
        return response.data;
      },
      getAppointmentSlots: async (
        date = new Date().toISOString().split("T")[0],
      ) => {
        const response = await authAxios.get<IGetAppointmentSlots>(
          `/doctors/appointments/slots?date=${date}`,
        );
        return response.data;
      },
      getTodaysAppointments: async () => {
        const response = await authAxios.get("/doctors/appointments/today");
        return response.data;
      },
      getAppointmentRequests: async ({
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
        const response = await authAxios.get<IGetAppointmentRequests>(
          `/doctors/appointments/requests?${query}`,
        );
        return response.data;
      },
      acceptAppointmentRequest: async (data: {
        requestId: number;
        slotId: string;
      }) => {
        const response = await authAxios.post(
          "/doctors/appointments/accept",
          data,
        );
        return response.data;
      },
      declineAppointmentRequest: async (data: { requestId: number }) => {
        const response = await authAxios.post(
          "/doctors/appointments/decline",
          data,
        );
        return response.data;
      },
      cancelAppointment: async (data: {
        requestId: number;
        slotId: string;
        keepSlot: boolean;
      }) => {
        const response = await authAxios.post(
          "/doctors/appointments/cancel",
          data,
        );
        return response.data;
      },
      patchRescheduleAppointmentRequest: async (data: {
        requestId: number;
        slotId: string;
      }) => {
        const response = await authAxios.patch(
          `/doctors/appointments/reschedule`,
          data,
        );
        return response.data;
      },
    },
    records: {
      postStartConsultation: async (data: { patientId: string }) => {
        const response = await authAxios.post<IPostStartConsultation>(
          "/doctors/consultations/start",
          data,
        );
        return response.data;
      },
      patchUpdateConsultationStep: async (data: {
        consultationId: string;
        step: number;
      }) => {
        const response = await authAxios.patch(
          "/doctors/consultations/step",
          data,
        );
        return response.data;
      },

      getPatientRecord: async (id: string) => {
        const response = await authAxios.get<IApiResponse<IPatient>>(
          `/doctors/records/${id}`,
        );
        return response.data.data;
      },
      patchPatientRecord: async (id: string, data: IUpdatePatientRecord) => {
        const response = await authAxios.patch<IApiResponse<IPatient>>(
          `/doctors/records/${id}`,
          data,
        );
        return response.data.data;
      },
      postRecordRequest: async (data: { patientId: string }) => {
        const response = await authAxios.post(
          "/doctors/records/send-request",
          data,
        );
        return response.data;
      },
      checkRecordRequestStatus: async (data: { patientId: string }) => {
        const response = await authAxios.post<
          IApiResponse<"approved" | "not-approved" | "not-sent">
        >("/doctors/records/status", data);
        return response.data;
      },
      addRecord: async () => {
        const response = await authAxios.post("/doctors/records/add");
        return response.data;
      },
      addSurgery: async (
        id: string,
        surgery: {
          name: string;
          additionalNotes?: string;
        },
      ) => {
        const response = await authAxios.post(
          `/doctors/${id}/add-surgery`,
          surgery,
        );
        return response.data;
      },
      addAllergy: async (
        id: string,
        allergy: {
          name: string;
          severity: string;
          type: string;
        },
      ) => {
        const response = await authAxios.post(
          `/doctors/${id}/add-allergy`,
          allergy,
        );
        return response.data;
      },
      postDiagnosis: async (data: {
        consultationId: string;
        diagnosis: string;
        code: string;
        notes: string;
      }) => {
        const response = await authAxios.post("/doctors/add-diagnosis", data);
        return response.data;
      },
      postDiagnoses: async (data: {
        consultationId: string;
        diagnoses: {
          name: string;
          code: string;
          notes: string;
        }[];
      }) => {
        const response = await authAxios.post("/doctors/add-diagnoses", data);
        return response.data;
      },
      getPatientPrescriptions: async (id: string) => {
        const response = await authAxios.get<
          IPaginatedApiResponse<IPrescription>
        >(`/doctors/load-prescriptions/${id}`);
        return response.data;
      },
      postPrescriptions: async (data: {
        consultationId: string;
        prescriptions: Omit<IPrescription, "id">[];
      }) => {
        const response = await authAxios.post(
          "/doctors/add-prescriptions",
          data,
        );
        return response.data;
      },
      prescribeMedication: async () => {
        const response = await authAxios.post("/doctors/prescribe");
        return response.data;
      },
      getPatientDiagnosis: async (patientId: string) => {
        const response = await authAxios.get<IPaginatedApiResponse<IDiagnosis>>(
          `/doctors/load-diagnoses/${patientId}`,
        );
        return response.data;
      },
      getPatientLabs: async (id: string) => {
        const response = await authAxios.get<IPaginatedApiResponse<ILab>>(
          `/doctors/labs/${id}`,
        );
        return response.data;
      },
      postLab: async (data: {
        lab: string;
        notes: string;
        consultationId: string;
      }) => {
        const response = await authAxios.post("/doctors/request-lab", data);
        return response.data;
      },
      postLabs: async (data: {
        labs: string[];
        notes: string;
        consultationId: string;
      }) => {
        const response = await authAxios.post("/doctors/request-labs", data);
        return response.data;
      },
      addComplaint: async () => {
        const response = await authAxios.post("/doctors/add-complaint");
        return response.data;
      },
      addSymptom: async (data: {
        complaints: string[];
        symptoms: {
          [key: string]: {
            symptoms: string[];
            notes: string;
          };
        };
        from: string;
        to: string;
        medicinesTaken: {
          medicine: string[];
          notes: string;
        };
        consultationId: string;
      }) => {
        const response = await authAxios.post("/doctors/add-symptom", data);
        return response.data;
      },
      addFutureVisit: async (data: {
        consultationId: string;
        type: string;
        message: string;
        sendMessageAt: string;
      }) => {
        const response = await authAxios.post(
          "/doctors/add-future-visit",
          data,
        );
        return response.data;
      },
      completeConsultation: async (data: {
        consultationId: string;
        notes: string;
      }) => {
        const response = await authAxios.post(
          `/doctors/consultations/complete`,
          data,
        );
        return response.data;
      },
      endConsultation: async (data: {
        consultationId: string;
        reason: string;
      }) => {
        const response = await authAxios.post(
          `/doctors/consultations/end`,
          data,
        );
        return response.data;
      },
      getPatientConsultationNotes: async (
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
        const response = await authAxios.get<
          IPaginatedApiResponse<IConsultationNote>
        >(`/doctors/consultations/notes/${id}?limit=${limit}&page=${page}`);
        return response.data;
      },
      getSymptoms: async (data: {
        limit?: number;
        search?: string;
        type?: string;
        page?: number;
      }) => {
        const query = createQueryString(data);
        const response = await authAxios.get<IGetSymptoms>(
          `/doctors/symptoms?${query}`,
        );
        return response.data;
      },
      getMedicines: async (data: {
        limit?: number;
        search?: string;
        page?: number;
      }) => {
        const query = createQueryString(data);
        const response = await authAxios.get<IGetMedicines>(
          `/doctors/medicines?${query}`,
        );
        return response.data;
      },
    },
    addFamilyMember: async (id: string) => {
      const response = await authAxios.post(`/doctors/${id}/add-family-member`);
      return response.data;
    },
    editLifestyle: async (id: string) => {
      const response = await authAxios.post(`/doctors/${id}/edit-lifestyle`);
      return response.data;
    },

    settings: {
      uploadID: async () => {
        const response = await authAxios.post("/doctors/upload-id");
        return response.data;
      },
      uploadProfilePicture: async () => {
        const response = await authAxios.post(
          "/doctors/upload-profile-picture",
        );
        return response.data;
      },
      removeProfilePicture: async () => {
        const response = await authAxios.delete(
          "/doctors/remove-profile-picture",
        );
        return response.data;
      },
      setRate: async (data: { amount: number; lengthOfSession: number }) => {
        const response = await authAxios.post("/doctors/set-rate", data);
        return response.data;
      },
      addPaymentMethod: async (data: {
        card?: {
          cardNumber: string;
          nameOnCard: string;
        };
        mobile?: {
          mobileMoneyNumber: string;
          mobileMoneyProvider: string;
          mobileMoneyName: string;
        };
      }) => {
        const response = await authAxios.post(
          "/doctors/add-payment-method",
          data,
        );
        return response.data;
      },
      toggleNotifications: async () => {
        const response = await authAxios.post("/doctors/toggle-notifications");
        return response.data;
      },
    },
  };
}

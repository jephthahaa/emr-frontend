import { z } from "zod";
import { updateDoctorSchema } from "./schema";
import React from "react";
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "extra";
export type ButtonVariantStyle = Record<ButtonVariant | "base", string>;

export type ButtonSize = "sm" | "md" | "wide" | "lg";
export type ButtonSizeStyle = Record<ButtonSize, string>;

export type TextVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
export type TextVariantStyle = Record<TextVariant, string>;

export type TextSize = "smallest" | "very small" | "small" | "body";
export type TextSizeStyle = Record<TextSize, string>;

export type FormHelperType = "error" | "info";

export type DoctorLoginFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contact: string;
  dob: Date;
  confirmPassword: string;
  MDCRegistration: string;
  profilePicture: File;
  front: File;
  back: File;
};

export type TableHeader = {
  title: string;
  icon?: React.ReactNode;
  iconAction?: () => void;
};

export type PatientTableData = {
  id: string;
  patientName: string;
  contact: string;
  gender: "Male" | "Female";
  clinic: string;
  recentConsult: Date;
  displayPicture: string;
};

export type SortDirection = "asc" | "desc";

export type PatientTableDataFilter = {
  orderBy: keyof PatientTableData;
  direction: SortDirection;
};

export type User = {
  username: string;
  displayPicture: string;
  email: string;
};

export type IAppointmentSlot = {
  id: string;
  mode: IAppointmentVisitType;
  startDate: Date | string;
  endDate: Date | string;
  status: AppointmentStatus;
  patient?: {
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
};

export type IAppointmentSlotData = {
  date: string;
  startTime: string;
  endTime: string;
  type: IAppointmentVisitType;
};

export type IApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

export type IPaginatedApiResponse<T> = {
  status: boolean;
  message: string;
  data: T[];
  page: number;
  total: number;
};

export type IGetAppointmentSlotData = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: IAppointmentVisitType;
  status: AppointmentStatus;
};

export type IAppointment = {
  date: string | number | Date;
  id: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  patient: {
    profilePicture: string;
    firstName: string;
    lastName: string;
  };
  doctor?: {
    firstName: string;
    lastName: string;
    profilePicture: string | null;
    specializations: string[] | null;
  };
  reason: string;
  notes: string;
  status: AppointmentStatus;
  type: IAppointmentVisitType;
};

export type IAppointmentRequestData = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: IAppointmentVisitType;
  appointmentRequests: {
    id: number;
    patient: {
      requestId: string;
      firstName: string;
      lastName: string;
    };
    reason: string;
    notes: string;
    status: AppointmentStatus;
  }[];
};

export type IPatientAppointmentRequest = {
  id: string;
  doctor: {
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  status: AppointmentStatus;
  type: IAppointmentVisitType;
  startTime: string;
};

export type IAppointmentRequest = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  slotId: string;
  type: IAppointmentVisitType;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
  };
  reason: string;
  notes: string;
  status: AppointmentRequestStatus;
};

export type IUpcomingAppointment = {
  id: string;
  doctor: {
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  status: AppointmentRequestStatus;
  type: IAppointmentVisitType;
  date: string;
};

export type IPatientGetAppointmentRequest = {
  id: number;
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  status: AppointmentRequestStatus;
  type: IAppointmentVisitType;
  date: string;
};

export type IGetUpcomingAppointments = IPaginatedApiResponse<IAppointment>;

export type IPostAppointmentSlot = IApiResponse<IGetAppointmentSlotData>;

export type IGetAppointmentSlots =
  IPaginatedApiResponse<IGetAppointmentSlotData>;

export type IGetAppointmentRequests =
  IPaginatedApiResponse<IAppointmentRequest>;
export type IAppointmentVisitType = "virtual" | "visit";
export type AppointmentStatus =
  | "accepted"
  | "pending"
  | "declined"
  | "completed"
  | "cancelled";
export type AppointmentRequestStatus = Exclude<AppointmentStatus, "completed">;

export type INotification = {
  status: boolean;
  email: boolean;
  records: boolean;
  messages: boolean;
  appointments: boolean;
};

export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
};

export type IPatient = {
  notifications: INotification;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  contact: string;
  address: string;
  city: string;
  dob: string;
  isActive: boolean;
  profilePicture: string | null;
  insuranceInfo: {
    provider: string;
  };
  maritalStatus: string | null;
  denomination: string | null;
  bloodGroup: string | null;
  height: number | null;
  weight: number | null;
  temperature: number | null;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  } | null;
  heartRate: number | null;
  bloodSugarLevel: number | null;
  lifestyle: ILifestyle | null;
  allergies?: IAllergy[];
  surgeries?: ISurgery[];
  gynae?: IGynae;
  familyMembers?: IFamilyMember[];
  nearestAppointment: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
  } | null;
  recentConsultDate: string | null;
};

export type ILifestyle = {
  occupation: string;
  parents: {
    maritalStatus: string;
    livingStatus: string;
    married: boolean;
  };
  stress: number;
  additionalNotes: string;
  socialHistory: string;
  alcohol: {
    status: string;
    yearsOfDrinking: number;
  };
  smoking: {
    status: string;
    yearsOfSmoking: number;
  };
  familyHistory: string;
};

export type IPaymentMethod = {
  id: string;
  cardNumber: string;
  nameOnCard: string;
  mobileMoneyNumber: string;
  mobileMoneyProvider: string;
  mobileMoneyName: string;
  type: "bankCard" | "mobileMoney";
};

export type IFamilyMember = {
  id: string;
  firstName: string;
  lastName: string;
  relation: string;
  createdAt: Date;
  status: boolean;
};

export type IGynae = {
  id: string;
  contraception: string[];
  additionalInstructions: string;
  numberOfPregnancies: number;
  pregnancyComplications: string[];
};

export type ISurgery = {
  id: string;
  name: string;
  additionalNotes: string;
};

export type IAllergy = {
  id: string;
  allergy: string;
  type: IAllergyType;
  severity: "mild" | "moderate" | "severe";
};
export type IAllergyType = "medication" | "non-medication" | "food";
export type IAllergySeverity = "mild" | "moderate" | "severe";

export type IDoctor = {
  notifications: INotification;
  id: string;
  email: string;
  dob: string;
  firstName: string;
  lastName: string;
  gender: string;
  contact: string;
  address: string;
  city: string;
  qualifications: string[];
  specializations: string[];
  experience: number | null;
  profilePicture: string | null;
  MDCRegistration: string;
  education:
    | {
        degree: string;
        school: string;
      }[]
    | null;
  bio: string | null;
  languages: string[] | null;
  awards: string[] | null;
  verification_status: "verified" | "unverified";
  isActive: boolean;
  rate: {
    amount: number;
    lengthOfSession: number;
  } | null;
  schoolsAttended: string[] | null;
  IDs: {
    back: string;
    front: string;
  };
  isFavourite: boolean;
  ratings: number;
  noOfConsultations: number;
  paymentMethods: IPaymentMethod[];
  recentConsultDate: string | null;
};
export type IUpdateDoctor = z.infer<typeof updateDoctorSchema>;
export type IGetDoctorDetails = IApiResponse<IDoctor>;

export type PaymentMethod = {
  cardNumber?: string;
  nameOnCard?: string;
  mobileMoneyNumber?: string;
  mobileMoneyProvider?: string;
  mobileMoneyName?: string;
};

export type IAppointmentRequestShowDialog =
  | {
      requestId: number;
      slotId: string;
      action: "cancel" | "rechedule" | "accept" | "decline";
    }
  | undefined;

export type ISMIShowDialog<T> =
  | {
      data: T;
      type: "edit" | "delete";
    }
  | undefined;

export type IMedicalRecordRequest = {
  id: string;
  createdAt: string;
  approved: boolean;
  doctor: {
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
};

export type IRecord = {
  id: string;
  createdAt: string;
  status: "active" | "completed";
  currentStep: number;
  user: IUser;
  rate: IDoctor["rate"];
};

export type ILab = {
  id: string;
  lab: string;
  fileUrl: string | null;
  notes: string;
  status: "pending" | "completed";
};

export type IPatientLab = {
  id: string;
  lab: string;
  fileUrl: string;
  status: "pending" | "completed";
  notes: string;
  createdAt: Date;
  consultationId: string;
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
};

export type IPatientPrescription = {
  id: string;
  createdAt: string;
  prescriptionUrl: string;
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
};

export type IDiagnosis = {
  id: string;
  name: string;
  code: string;
  consultationNotes: string;
};

export type IPrescription = {
  id: string;
  option: "prescribe" | "dispense";
  medicine: string;
  dosage: string;
  duration: string;
  repeat: string;
  instructions: string;
  additionalInstructions: string;
};

export type IPostStartConsultation = IApiResponse<IRecord>;

export type IGetActiveConsultation = IApiResponse<IRecord | false>;

export type IReview = {
  id: string;
  status: "pending" | "completed" | "skipped";
  rating?: number;
  comment?: string | null;
  communicationSkill: {
    isProfessional: string;
    isClear: number;
    isAttentive: string;
    isComfortable: string;
  } | null;
  expertise: {
    knowledge: number;
    thorough: string;
    confidence: number;
    helpful: string;
  } | null;
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
};

export type IGetCheckReview = IApiResponse<IReview | null>;

export type IMessege = {
  id: string;
  consultationId: string;
  message: string;
  senderId: string;
  receiverId: string;
  read: boolean;
  createdAt: string;
  fileUrl: string | null;
};

export type IGetUserFunc = Promise<IApiResponse<IUser[]>>;

export type ILog = {
  id: string;
  type: string;
  userId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IBroadcast = {
  id: string;
  message: string;
  admin: {
    id: string;
    name: string;
    profilePicture: string;
  };
  createdAt: string;
};

export type IConsultationNote = {
  id: string;
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  notes: string;
  createdAt: string;
};

export type IPaymentResponse = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

export type IVerifyPayment = {
  reference: string;
  type: string;
  amount: number;
  currency: string;
  channel: string;
  status: string;
  doctor: IUser;
  patient: IUser;
  createdAt: string;
  updatedAt: string;
};

export type IPostPaymentVerify = IApiResponse<IVerifyPayment>;

export type IPostPayment = IApiResponse<IPaymentResponse>;

export type ITransaction = {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  channel: string;
  status: string;
  patient: IUser;
  doctor: IUser;
  type: string;
  createdAt: string;
};

export type ISymptom = {
  id: string;
  name: string;
  type: string;
};

export type IMedicine = {
  id: string;
  name: string;
  description: string;
};

export type IGetSymptoms = IPaginatedApiResponse<ISymptom>;
export type IGetMedicines = IPaginatedApiResponse<IMedicine>;

export type IIssue = {
  id: string;
  name: string;
  status: "open" | "fixed";
  description: string;
  userType: "patient" | "doctor";
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
};

export type IFeedback = {
  id: string;
  type: string;
  comment: string;
  userType: "patient" | "doctor";
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
};

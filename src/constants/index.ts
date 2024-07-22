import {
  DiscoverSquareIcon,
  Home01Icon,
  Message01Icon,
  UserSharingIcon,
  FavoriteIcon,
  Money02Icon,
  Notification03Icon,
  SecurityLockIcon,
  SidebarTopIcon,
  UserCircleIcon,
  ChartHistogram,
  Share01Icon,
} from "@/assets/icons";

import { Calendar03Icon } from "@/assets/icons/Calendar03Icon";
import {
  ConsultationStep1,
  ConsultationStep2,
  ConsultationStep3,
  ConsultationStepFinal,
} from "@/assets/images/consultation-steps";
import { GlobeIcon } from "lucide-react";

export enum ZOMUJO_SERVICE_MODE {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN",
}

export const SERVICE_MODE: ZOMUJO_SERVICE_MODE =
  (process.env.NEXT_PUBLIC_SERVICE_MODE as ZOMUJO_SERVICE_MODE) ??
  ZOMUJO_SERVICE_MODE.PATIENT;

export const isServiceMode = (
  mode: ZOMUJO_SERVICE_MODE | "PATIENT" | "DOCTOR" | "ADMIN",
) => {
  return SERVICE_MODE === mode;
};

export const DATE_FORMATS = {
  fullDate: "yyyy-MM-dd HH:mm:ss",
} as const;

export const ROUTES = {
  SHARED: [
    "/",
    "/appointments",
    "/messages",
    "/help",
    "/settings",
    "/referrals",
  ],
  PATIENT: ["/discover", "/favorites", "/doctors"],
  DOCTOR: ["/patients"],
  ADMIN: ["/admin_"],
};

export function isRouteAllowed(
  path: string,
  userType: keyof typeof ROUTES,
): boolean {
  // Check if userType is valid
  if (!Object.keys(ROUTES).includes(userType)) {
    console.error("Invalid user type");
    return false;
  }

  // Check if path is in the shared routes
  if (ROUTES.SHARED.includes(`/${path.split("/")[1]}`)) {
    return true; // Shared paths are accessible by all user types
  }

  // Check if path is within the specific userType's routes
  return ROUTES[userType].includes(`/${path.split("/")[1]}`);
}

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

export const DOCTORSMENUTABS = [
  {
    Icon: Home01Icon,
    label: "Home",
    link: "/",
  },
  {
    Icon: Calendar03Icon,
    label: "Appointments",
    link: "/appointments",
  },
  {
    Icon: UserSharingIcon,
    label: "Patients",
    link: "/patients",
  },
  {
    Icon: Message01Icon,
    label: "Messages",
    link: "/messages",
  },
  {
    Icon: Share01Icon,
    label: "Referrals",
    link: "/referrals",
  },
];

export const ADMIN_MENUTABS = [
  {
    Icon: Home01Icon,
    label: "Overview",
    link: "",
  },
  {
    Icon: ChartHistogram,
    label: "Analytics",
    link: "/analytics",
  },
  {
    Icon: Calendar03Icon,
    label: "Appointments",
    link: "/appointments",
  },
  {
    Icon: UserSharingIcon,
    label: "Users",
    link: "/users",
    sub: [
      {
        label: "Doctors",
        link: "/doctors",
      },
      {
        label: "Patients",
        link: "/patients",
      },
    ],
  },
  {
    Icon: Money02Icon,
    label: "Transactions",
    link: "/transactions",
  },
];

export const PATIENTMENUTABS = [
  {
    Icon: Home01Icon,
    label: "Home",
    link: "/",
  },
  {
    Icon: DiscoverSquareIcon,
    label: "Discover Doctors",
    link: "/discover",
  },
  {
    Icon: Calendar03Icon,
    label: "Appointments",
    link: "/appointments",
  },
  {
    Icon: FavoriteIcon,
    label: "Favorite Doctors",
    link: "/favorites",
  },
  {
    Icon: Message01Icon,
    label: "Messages",
    link: "/messages",
  },
];

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const DAYS_OF_WEEK_SHORT = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const doctorSidebarItems = [
  {
    id: "personal",
    title: "Personal",
    Icon: UserCircleIcon,
  },
  {
    id: "security",
    title: "Security",
    Icon: SecurityLockIcon,
  },
  {
    id: "notification",
    title: "Notification",
    Icon: Notification03Icon,
  },
  {
    id: "payment",
    title: "Payment",
    Icon: Money02Icon,
  },
  {
    id: "identification",
    title: "Identification",
    Icon: SidebarTopIcon,
  },
] as const;

const patientSidebarItems = [
  {
    id: "personal",
    title: "Personal",
    Icon: UserCircleIcon,
  },
  {
    id: "security",
    title: "Security",
    Icon: SecurityLockIcon,
  },
  {
    id: "notification",
    title: "Notification",
    Icon: Notification03Icon,
  },
] as const;

const adminSidebarItems = [
  {
    id: "personal",
    title: "Personal",
    Icon: UserCircleIcon,
  },
  {
    id: "security",
    title: "Security",
    Icon: SecurityLockIcon,
  },
  {
    id: "notification",
    title: "Notification",
    Icon: Notification03Icon,
  },
  {
    id: "globals",
    title: "Globals",
    Icon: GlobeIcon,
  },
] as const;

export const SETTINGSMENUTABS = {
  DOCTOR: doctorSidebarItems,
  PATIENT: patientSidebarItems,
  ADMIN: adminSidebarItems,
};

export const DASHBOARDMENUTABS = {
  DOCTOR: DOCTORSMENUTABS,
  PATIENT: PATIENTMENUTABS,
  ADMIN: ADMIN_MENUTABS,
};

export const sidebarItems = [
  {
    id: "overview",
    title: "Overview",
  },
  {
    id: "demographics",
    title: "Demographics",
  },
] as const;

export const consultationItems = [
  // {
  //   id: "consultation-notes",
  //   title: "Consultation Notes",
  // },
  {
    id: "surgries",
    title: "Surgries",
  },
  {
    id: "allergies",
    title: "Allergies",
  },
  {
    id: "lifestyle-and-family",
    title: "Lifestyle and Family",
  },
  {
    id: "gynae",
    title: "Gynae",
  },
  // {
  //   id: "diagnosis",
  //   title: "Diagnosis",
  // },
  // {
  //   id: "lab-results",
  //   title: "Lab Results",
  // },
  // {
  //   id: "prescription",
  //   title: "Prescription",
  // },
] as const;

export type IconsultationSidebarItems =
  | (typeof consultationItems)[number]["id"]
  | (typeof sidebarItems)[number]["id"];

export const CONSULTATION_STEPS = [
  {
    title: "Symptoms",
    icon: ConsultationStep1,
  },
  {
    title: "Lab",
    icon: ConsultationStep2,
  },
  {
    title: "Diagnose & Prescribe",
    icon: ConsultationStep3,
  },
  {
    title: "Review",
    icon: ConsultationStepFinal,
  },
];

export enum Draggables {
  SYMPTOM = "SYMPTOM",
  APPOINTMENT = "APPOINTMENT",
  MEDICINE = "MEDICINE",
}

export const COMMON_COMPLAINTS = [
  "Headache",
  "Stomach Pains",
  "Cold/Flu",
  "Fever",
  "Constipation",
  "Rash",
  "Weight Loss",
  "Weight Gain",
  "Dizziness",
  "Fatigue",
  "Cough",
  "Sore Throat",
  "Nausea",
];

export const SYMPOTOMS = [
  {
    id: "1",
    name: "Dizziness/Vertigo",
    type: "Neurological",
  },
  {
    id: "2",
    name: "Seizures",
    type: "Neurological",
  },
  {
    id: "3",
    name: "Neurology deficits (motor, sensory, coordination)",
    type: "Neurological",
  },
  {
    id: "4",
    name: "Chest pain/discomfort",
    type: "Cardiovascular",
  },
  {
    id: "5",
    name: "Palpitations",
    type: "Cardiovascular",
  },
  {
    id: "6",
    name: "Shortness of breath",
    type: "Cardiovascular",
  },
  {
    id: "7",
    name: "Edema (swelling)",
    type: "Cardiovascular",
  },
  {
    id: "a",
    name: "Syncope (fainting)",
    type: "Cardiovascular",
  },
  {
    id: "8",
    name: "Cough",
    type: "Respiratory",
  },
  {
    id: "9",
    name: "Sputum",
    type: "Respiratory",
  },
  {
    id: "10",
    name: "Wheezing",
    type: "Respiratory",
  },
  {
    id: "11",
    name: "Hemoptysis",
    type: "Respiratory",
  },
  {
    id: "12",
    name: "Chest pain",
    type: "Respiratory",
  },
  {
    id: "13",
    name: "Abdominal pain",
    type: "Gastrointestinal",
  },
  {
    id: "14",
    name: "Nausea/vomiting",
    type: "Gastrointestinal",
  },
  {
    id: "15",
    name: "Diarrhea",
    type: "Gastrointestinal",
  },
  {
    id: "16",
    name: "Constipation",
    type: "Gastrointestinal",
  },
  {
    id: "17",
    name: "Jaundice",
    type: "Gastrointestinal",
  },
  {
    id: "18",
    name: "Dysuria",
    type: "Genitourinary",
  },
  {
    id: "19",
    name: "Hematuria",
    type: "Genitourinary",
  },
  {
    id: "20",
    name: "Polyuria",
    type: "Genitourinary",
  },
  {
    id: "21",
    name: "Urinary incontinence",
    type: "Genitourinary",
  },
  {
    id: "22",
    name: "Dyspareunia",
    type: "Genitourinary",
  },
  {
    id: "23",
    name: "Vaginal discharge",
    type: "Genitourinary",
  },
  {
    id: "24",
    name: "Joint pain",
    type: "Musculoskeletal",
  },
  {
    id: "25",
    name: "Back pain",
    type: "Musculoskeletal",
  },
  {
    id: "26",
    name: "Muscle pain",
    type: "Musculoskeletal",
  },
  {
    id: "27",
    name: "Muscle weakness",
    type: "Musculoskeletal",
  },
  {
    id: "28",
    name: "Rash",
    type: "Integumentary",
  },
  {
    id: "29",
    name: "Itching",
    type: "Integumentary",
  },
  {
    id: "30",
    name: "Lesion",
    type: "Integumentary",
  },
  {
    id: "31",
    name: "Hair loss",
    type: "Integumentary",
  },
  {
    id: "32",
    name: "Polydipsia",
    type: "Endocrine",
  },
  {
    id: "33",
    name: "Polyphagia",
    type: "Endocrine",
  },
  {
    id: "34",
    name: "Polyuria",
    type: "Endocrine",
  },
  {
    id: "35",
    name: "Heat/cold intolerance",
    type: "Endocrine",
  },
  {
    id: "36",
    name: "Fatigue",
    type: "Endocrine",
  },
  {
    id: "37",
    name: "Weight gain",
    type: "Endocrine",
  },
  {
    id: "38",
    name: "Weight loss",
    type: "Endocrine",
  },
];

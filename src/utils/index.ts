import clsx, { type ClassValue } from "clsx";
import { IPatient, SortDirection } from "@/types";
import { twMerge } from "tailwind-merge";
import { BlackPerson } from "@/assets/images";

export const cn: (...input: ClassValue[]) => string = (...input) => {
  return twMerge(clsx(...input));
};

export function cva<T>(input: T) {
  return input;
}

export class ValidateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidateError";
  }
}

export function orderContent<T>(
  orderBy: keyof T,
  list: T[],
  direction: SortDirection,
): T[] {
  return list.slice().sort((a, b) => {
    if (direction === "asc") {
      if (a[orderBy] < b[orderBy]) {
        return -1;
      }
      if (a[orderBy] > b[orderBy]) {
        return 1;
      }
    } else {
      if (a[orderBy] > b[orderBy]) {
        return -1;
      }
      if (a[orderBy] < b[orderBy]) {
        return 1;
      }
    }
    return 0;
  });
}

export async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

interface WeekdayObject {
  day: number;
  weekday: string;
}

export function getWeekdaysOfCurrentWeek(today: Date): WeekdayObject[] {
  const currentDay = today.getDate();
  const currentWeekday = today.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6

  const monday = new Date(today);
  monday.setDate(currentDay - currentWeekday + (currentWeekday === 0 ? -6 : 1)); // Adjust for Sunday
  const weekdays: WeekdayObject[] = [];

  for (let i = 0; i < 5; i++) {
    // Monday to Friday
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);

    const weekdayObject: WeekdayObject = {
      day: currentDate.getDate(),
      weekday: getWeekdayString(currentDate.getDay()),
    };

    weekdays.push(weekdayObject);
  }

  return weekdays;
}

function getWeekdayString(dayIndex: number): string {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[dayIndex];
}

export function getTimeParts(time: string): {
  hour: number;
  minute: number;
  seconds: number;
} {
  const timeParts = time.split(":");

  return {
    hour: parseInt(timeParts[0]),
    minute: parseInt(timeParts[1]),
    seconds: parseInt(timeParts[2]),
  };
}

export function setDateTime(date: Date, time: string): Date {
  const timeParts = getTimeParts(time);
  date.setHours(timeParts.hour);
  date.setMinutes(timeParts.minute);
  date.setSeconds(timeParts.seconds);
  return date;
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export const countFilledFields = (userDetails: any) => {
  let count = 0;
  const missingFields = [];
  if (!userDetails) {
    return;
  }

  for (const key in userDetails) {
    const typedKey = key as keyof typeof userDetails;
    if (
      typedKey === "specializations" ||
      typedKey === "awards" ||
      typedKey === "gynae" ||
      typedKey === "familyMembers" ||
      typedKey === "qualifications" ||
      typedKey === "maritalStatus" ||
      typedKey === "denomination" ||
      typedKey === "bloodGroup" ||
      typedKey === "height" ||
      typedKey === "weight" ||
      typedKey === "temperature" ||
      typedKey === "bloodPressure" ||
      typedKey === "heartRate" ||
      typedKey === "bloodSugarLevel" ||
      typedKey === "lifestyle" ||
      typedKey === "allergies" ||
      typedKey === "balance" ||
      typedKey === "surgeries"
    ) {
      continue;
    }
    count++;
    if (
      (typeof userDetails[typedKey] === "string" &&
        userDetails[typedKey] === "") ||
      userDetails[typedKey] === null
    ) {
      missingFields.push(typedKey);
      continue;
    }

    if (
      typeof userDetails[typedKey] === "object" &&
      userDetails[typedKey] === null
    ) {
      missingFields.push(typedKey);
      continue;
    }

    if (
      typeof userDetails[typedKey] === "object" &&
      userDetails[typedKey] !== null &&
      Array.isArray(userDetails[typedKey]) &&
      (userDetails[typedKey] as any[])?.length === 0
    ) {
      missingFields.push(typedKey);
      continue;
    }
  }

  return { count, missingFields };
};

export function getWeekStartandEnd(today: Date): {
  startOfWeek: Date;
  endOfWeek: Date;
} {
  const currentDay = today.getDate();
  const currentWeekday = today.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6

  const monday = new Date(today);
  monday.setDate(currentDay - currentWeekday + (currentWeekday === 0 ? -6 : 1)); // Adjust for Sunday

  const currentDate = new Date(monday.setHours(0, 0, 0, 0));
  const sunday = new Date(monday.setHours(23, 59, 59, 0));
  sunday.setDate(monday.getDate() + 6);

  return { startOfWeek: currentDate, endOfWeek: sunday };
}

export function interpolateRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  // Check if the input value is within the input range
  if (value < inMin || value > inMax) {
    throw new Error("Input value is out of the input range");
  }

  // Calculate the normalized value within the input range
  const normalizedValue = (value - inMin) / (inMax - inMin);

  // Interpolate the value within the output range
  const interpolatedValue = outMin + normalizedValue * (outMax - outMin);

  return interpolatedValue;
}

export function areDeeplyEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;

    return obj1.every((elem, index) => {
      return areDeeplyEqual(elem, obj2[index]);
    });
  }

  if (
    typeof obj1 === "object" &&
    typeof obj2 === "object" &&
    obj1 !== null &&
    obj2 !== null
  ) {
    if (Array.isArray(obj1) || Array.isArray(obj2)) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (
      keys1.length !== keys2.length ||
      !keys1.every((key) => keys2.includes(key))
    )
      return false;

    for (let key in obj1) {
      console.log(obj1[key], obj2[key]);
      let isEqual = areDeeplyEqual(obj1[key], obj2[key]);
      if (!isEqual) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export function isBetweenNearestAppointment(
  nearestAppointment: IPatient["nearestAppointment"],
): boolean {
  if (nearestAppointment === null || nearestAppointment === undefined) {
    return false;
  }

  const { date, startTime, endTime } = nearestAppointment;

  const appointmentStartTime = new Date(`${date} ${startTime}`);
  const appointmentEndTime = new Date(`${date} ${endTime}`);
  const today = new Date();

  return today >= appointmentStartTime && today <= appointmentEndTime;
}

export const getReturnValues = (
  countDown: number,
): [number, number, number, number] => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export const returnDoubleDigits = (value: number): string => {
  return value < 10 ? `0${value}` : value.toString();
};

export const isUrl = (url: string | null | undefined) => {
  if (url === undefined || url === null) {
    return BlackPerson.src;
  }
  if (url.startsWith("https://")) {
    return url;
  } else {
    return BlackPerson.src;
  }
};

// Create query string
export const createQueryString = (
  params: Record<string, string | number | null | undefined> | undefined,
) => {
  if (!params) return "";
  const newSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === "" || value === undefined) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, String(value));
    }
  }

  return newSearchParams.toString();
};

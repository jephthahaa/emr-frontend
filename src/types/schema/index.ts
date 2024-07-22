import { z } from "zod";

export const updateDoctorSchema = z
  .object({
    notifications: z.object({
      email: z.boolean({
        required_error: "Email notifications are required",
      }),
      status: z.boolean({
        required_error: "Status notifications are required",
      }),
      records: z.boolean({
        required_error: "Records notifications are required",
      }),
      messages: z.boolean({
        required_error: "Messages notifications are required",
      }),
      appointments: z.boolean({
        required_error: "Appointments notifications are required",
      }),
    }),
    email: z.string().email(),
    dob: z.string(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    gender: z.string().min(2),
    contact: z.string().min(2),
    address: z.string().min(2),
    city: z.string().min(2),
    qualifications: z.array(z.string().min(2)),
    specializations: z.array(z.string().min(2)),
    experience: z.number(),
    education: z.array(
      z.object({
        degree: z.string(),
        school: z.string(),
      }),
    ),
    bio: z.string(),
    languages: z.array(z.string().min(2)),
    awards: z.array(z.string().min(2)),
    rate: z.object({
      amount: z.number({
        required_error: "Rate amount is required",
      }),
      lengthOfSession: z.number({
        required_error: "Length of session is required",
      }),
    }),
    schoolsAttended: z.array(z.string().min(2)),
  })
  .partial();

export const updatePatientSchema = z
  .object({
    notifications: z.object({
      email: z.boolean({
        required_error: "Email notifications are required",
      }),
      status: z.boolean({
        required_error: "Status notifications are required",
      }),
      records: z.boolean({
        required_error: "Records notifications are required",
      }),
      messages: z.boolean({
        required_error: "Messages notifications are required",
      }),
      appointments: z.boolean({
        required_error: "Appointments notifications are required",
      }),
    }),
    email: z.string().email(),
    age: z.number(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    gender: z.string().min(2),
    contact: z.string().min(2),
    address: z.string().min(2),
    dob: z.string().min(4),
    city: z.string().min(2),
    insuranceInfo: z.object({
      provider: z.string(),
    }),
    maritalStatus: z.string(),
    denomination: z.string(),
    bloodGroup: z.string(),
    height: z.number(),
    weight: z.number(),
    temperature: z.number(),
    bloodPressure: z.object({
      systolic: z.number(),
      diastolic: z.number(),
    }),
    bloodSugarLevel: z.number(),
    heartRate: z.number(),
    lifestyle: z.object({
      occupation: z.string(),
      parents: z.object({
        maritalStatus: z.string(),
        livingStatus: z.string(),
        married: z.boolean(),
      }),
      stress: z.number(),
      additionalNotes: z.string(),
      socialHistory: z.string(),
      alcohol: z.object({
        status: z.string(),
        yearsOfDrinking: z.number(),
      }),
      smoking: z.object({
        status: z.string(),
        yearsOfSmoking: z.number(),
      }),
      familyHistory: z.string(),
    }),
  })
  .partial();

export type IUpdatePatientRecord = z.infer<typeof updatePatientSchema>;

export const ReviewSchema = z
  .object({
    // status: z.enum(["pending", "skipped", "complete"]).default("pending"),
    rating: z.number().default(0),
    comment: z.string(),
    communicationSkill: z.object({
      isProfessional: z.string(),
      isClear: z.number(),
      isAttentive: z.string(),
      isComfortable: z.string(),
    }),
    expertise: z.object({
      knowledge: z.number(),
      thorough: z.string(),
      confidence: z.number(),
      helpful: z.string(),
    }),
  })
  .partial();

export type IReviewSchema = z.infer<typeof ReviewSchema>;

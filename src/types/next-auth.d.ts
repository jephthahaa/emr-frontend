/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import { IDoctor, IPatient } from ".";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
      firstName: string;
      lastName: string;
      doctor: IDoctor;
      patient: IPatient;
      profilePicture: string;
    };
  }

  interface User {
    id: string;
    token: string;
    firstName: string;
    lastName: string;
    doctor: IDoctor;
    patient: IPatient;
    profilePicture: string;
  }
}

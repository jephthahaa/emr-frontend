"use client";
import { createContext, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { wait } from "@/utils";
import { DoctorLoginFormFields } from "@/types";
import useZomujoApi from "@/services/zomujoApi";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
// import { differenceInCalendarYears } from "date-fns";

type DoctorSignupContextType = {
  error: string | null;
  isLoading: boolean;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit: ReturnType<
    typeof useForm<DoctorLoginFormFields>
  >["handleSubmit"];
  register: ReturnType<typeof useForm<DoctorLoginFormFields>>["register"];
  watch: ReturnType<typeof useForm<DoctorLoginFormFields>>["watch"];
  setValue: ReturnType<typeof useForm<DoctorLoginFormFields>>["setValue"];
  errors: ReturnType<
    typeof useForm<DoctorLoginFormFields>
  >["formState"]["errors"];
  status: "error" | "idle" | "pending" | "success";
  isPending: boolean;
  onSubmit: SubmitHandler<DoctorLoginFormFields>;
  reset: () => void;
};

const DoctorSignupContext = createContext<DoctorSignupContextType>({
  error: null,
  isLoading: false,
  currentStep: 0,
  setCurrentStep: () => {},
  handleSubmit: () => {
    return "" as any;
  },
  register: () => {
    return "" as any;
  },
  watch: () => {
    return "" as any;
  },
  setValue: () => {},
  errors: {},
  status: "idle",
  isPending: false,
  onSubmit: () => {},
  reset: () => {},
});

type FormFields = DoctorLoginFormFields;

const DoctorSignupProvider = ({ children }: { children: React.ReactNode }) => {
  const { doctors } = useZomujoApi(false).auth;
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormFields>();

  const { mutate, status, isPending, reset } = useMutation({
    mutationKey: ["doctors", "register"],
    mutationFn: async (data: FormFields) => {
      const formData = new FormData();
      formData.append("confirmPassword", data.password);
      for (const key in data) {
        const typedKey = key as keyof FormFields;
        if (data.hasOwnProperty(typedKey)) {
          if (typedKey === "dob") {
            formData.append("dob", format(data[typedKey], "yyyy-MM-dd"));
            continue;
          }
          formData.append(key, data[typedKey]);
        }
      }
      return doctors.register(formData);
    },
    onError(error, variables, context) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError("Oops! Something went wrong. Please try again.");
      }
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setError(null);
    setisLoading(true);

    switch (currentStep) {
      case 0:
        await wait(1000);
        setCurrentStep(1);
        break;

      case 3:
        mutate(data);
        break;

      default:
        setCurrentStep((prev) => prev + 1);
        break;
    }

    setisLoading(false);
  };

  return (
    <DoctorSignupContext.Provider
      value={{
        error,
        isLoading,
        currentStep,
        setCurrentStep,
        handleSubmit,
        register,
        watch,
        setValue,
        errors,
        status,
        isPending,
        onSubmit,
        reset,
      }}
    >
      {children}
    </DoctorSignupContext.Provider>
  );
};

export default DoctorSignupProvider;

export const useDoctorSignupContext = () => useContext(DoctorSignupContext);

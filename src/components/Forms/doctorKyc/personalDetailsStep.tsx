import { Input } from "@/components/FormElements";
import Button from "@/components/misc/button";
import { InfoIcon } from "lucide-react";
import React from "react";
import { useDoctorSignupContext } from "../contexts/doctorSignupProvider";
import { format, subYears } from "date-fns";

const PersonalDetailsStep = () => {
  const { register, watch } = useDoctorSignupContext();

  const maxDate = format(subYears(new Date(), 16), "yyyy-MM-dd");

  return (
    <div className="flex w-full flex-col gap-11">
      <div className="flex flex-col gap-1.5">
        <p className="flex flex-row items-center gap-1 text-[32px] font-bold leading-8">
          Personal Details{" "}
          <span>
            <InfoIcon size={16} />
          </span>
        </p>
        <p className="leading-6 text-[#6B7280]">
          Provide your personal details for a personalized Zyptyk experience
          tailored to your preferences.
        </p>
      </div>
      <div className="grid w-full grid-cols-2 gap-x-8 gap-y-[28px]">
        <div>
          <Input
            label="Name"
            placeholder={`${watch("firstName")} ${watch("lastName")}`}
            disabled
          />
        </div>
        <div className="relative">
          <p></p>
          <Input
            label="MDC Registration Number"
            placeholder="MDC / RN / XXXXX"
            {...register("MDCRegistration", { required: "MDC is required" })}
          />
        </div>
        <div>
          <Input
            label="Birthdate"
            type="date"
            placeholder="Dob"
            max={maxDate}
            {...register("dob", {
              required: "dob is required",
              valueAsDate: true,
              max: maxDate,
            })}
          />
        </div>
        <div>
          <Input
            label="Phone Number"
            placeholder="Eg. 05555345678"
            {...register("contact", { required: "MDC is required" })}
          />
        </div>
      </div>
      <Button type="submit">Continue</Button>
    </div>
  );
};

export default PersonalDetailsStep;

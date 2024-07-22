import { Clock01Icon, Video01Icon } from "@/assets/icons";
import { Calendar03Icon } from "@/assets/icons/Calendar03Icon";
import Button from "@/components/misc/button";
import { Button as ShadButton } from "@/components/ui/button";
import { IGetUpcomingAppointments } from "@/types";
import { isUrl } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

const ConsultationDetailsCard = (props: {
  onClose: () => void;
  id: string;
}) => {
  const queryClient = useQueryClient();

  const appointmentbase = queryClient.getQueryData<IGetUpcomingAppointments>([
    "patients",
    "upcoming",
    "appointments",
  ]);

  const appointmentBase = appointmentbase?.data ?? [];

  const appointment = appointmentBase.find((a) => a.id === props.id);

  console.log(appointment);

  return (
    <div className="flex min-h-[352px] w-[490px] flex-col gap-8 rounded-xl bg-white p-6">
      <div className="flex flex-row gap-3">
        <div className="h-14 w-14 rounded-full bg-gray-400">
          <Image
            className="h-full w-full rounded-full"
            src={isUrl(appointment?.doctor?.profilePicture)}
            width={56}
            height={56}
            alt="profile"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-lg font-bold">
            Dr.{" "}
            {`${appointment?.doctor?.firstName} ${appointment?.doctor?.lastName}`}
          </p>
          <p className="text-sm font-medium text-gray-400">
            {appointment?.doctor?.specializations
              ? appointment.doctor.specializations[0]
              : "General Practitioner"}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 bg-gray-50 p-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2 text-gray-500">
            <Calendar03Icon className="h-[18px] w-[18px]" />
            <p>Day & Date</p>
          </div>
          {appointment?.appointmentDate && (
            <p className="leading-4">
              {format(
                new Date(appointment?.appointmentDate),
                "eeee, dd MMMM, yyyy",
              )}
            </p>
          )}
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2 text-gray-500">
            <Clock01Icon className="h-[18px] w-[18px]" />
            <p>Time</p>
          </div>
          <p className="leading-4">
            {" "}
            {format(
              new Date(
                `${appointment?.appointmentDate} ${appointment?.startTime}`,
              ),
              "h:mm aa",
            )}{" "}
            -{" "}
            {format(
              new Date(
                `${appointment?.appointmentDate} ${appointment?.endTime}`,
              ),
              "h:mm aa",
            )}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2 text-gray-500">
            <Video01Icon className="h-[18px] w-[18px]" />
            <p>Tool</p>
          </div>
          <p className="leading-4">Google meet</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-end gap-3">
        <ShadButton variant="outline" className="gap-2 px-3 text-base">
          <Link size={18} /> Copy link
        </ShadButton>
        <Button
          onClick={props.onClose}
          className="w-fit"
          primaryClassname="px-5"
        >
          Join Consultation
        </Button>
      </div>
    </div>
  );
};

export default ConsultationDetailsCard;

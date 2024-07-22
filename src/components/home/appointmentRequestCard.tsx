import React from "react";
import Chip from "../misc/chip";
import Button from "../misc/button";
import { IAppointmentRequest, IAppointmentRequestShowDialog } from "@/types";
import { format, formatDistance } from "date-fns";
import { isUrl, setDateTime } from "@/utils";
import Image from "next/image";

const AppointmentRequestCard = ({
  request,
  setShowModal,
}: {
  request: IAppointmentRequest;
  setShowModal: React.Dispatch<
    React.SetStateAction<IAppointmentRequestShowDialog>
  >;
}) => {
  const requestDate = new Date(request.date);
  const startDate = setDateTime(new Date(request.date), request.startTime);
  const endDate = setDateTime(new Date(request.date), request.endTime);

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-gray-50 p-4">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-row items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-gray-600">
            <Image
              className="h-full w-full rounded-full"
              src={isUrl(request.patient.id)}
              width={28}
              height={28}
              alt="profile"
            />
          </div>
          <div className="flex h-full flex-col justify-between">
            <p className="text-sm font-medium ">
              {request.patient.firstName} {request.patient.lastName}
            </p>
            <Chip varient="red" text={request.reason} />
          </div>
        </div>
        <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-md bg-white">
          <p className="text-xs text-gray-500">{format(requestDate, "dd")}</p>
          <p className="text-xs text-gray-500">{format(requestDate, "MMM")}</p>
        </div>
      </div>

      <div className="flex flex-row justify-between text-xs font-medium">
        <p>
          {format(startDate, "hh:mm aaa")} - {format(endDate, "hh:mm aaa")}
        </p>
        <p>{formatDistance(requestDate, new Date(), { addSuffix: true })}</p>
      </div>

      <hr className="border-gray-200" />

      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold">Notes</p>
        <p className="text-xs leading-5 text-gray-500">{request.notes}</p>
      </div>

      <div className="flex flex-row gap-3">
        <Button
          type="button"
          onClick={() =>
            setShowModal({
              requestId: request.id,
              slotId: request.slotId,
              action: "accept",
            })
          }
          className="h-8 text-sm"
          variant="primary"
        >
          Accept
        </Button>
        <Button
          type="button"
          onClick={() =>
            setShowModal({
              requestId: request.id,
              slotId: request.slotId,
              action: "decline",
            })
          }
          className="h-8 text-sm"
          variant="outline"
        >
          Decline
        </Button>
      </div>
    </div>
  );
};

export default AppointmentRequestCard;

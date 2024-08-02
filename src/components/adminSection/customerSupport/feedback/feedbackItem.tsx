import React from "react";
import Image from "next/image";
import { isUrl } from "@/utils";
import { formatDistance, subSeconds } from "date-fns";
import { IFeedback } from "@/types";

const FeedbackItem = ({ feedback }: { feedback: IFeedback }) => {
  return (
    <div className="flex shrink-0 flex-col gap-4 rounded-2xl bg-white p-4">
      <div className="flex flex-row items-center gap-1.5">
        <div className="h-5 w-5 rounded-full bg-gray-500">
          <Image
            className="h-full w-full rounded-full"
            src={isUrl(feedback.user?.profilePicture)}
            width={20}
            height={20}
            alt="profile"
          />
        </div>
        <p className="text-sm font-medium">{`${
          feedback.userType === "doctor" ? "Dr. " : ""
        }${feedback.user.firstName} ${feedback.user.lastName}`}</p>
        <p className="text-grayscale-400">•</p>
        <p className="text-xs font-medium text-gray-400">
          {formatDistance(new Date(feedback.createdAt), new Date(), {
            addSuffix: true,
          })}
        </p>
        <p className="text-grayscale-400">•</p>
        <div className="flex items-center justify-center rounded-full bg-gray-200 px-2 py-0.5">
          <p className="text-xs">{feedback.type}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500">{feedback.comment}</p>
    </div>
  );
};
export default FeedbackItem;

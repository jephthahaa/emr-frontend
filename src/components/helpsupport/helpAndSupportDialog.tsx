"use client";
import { Button as ShadButton } from "@/components/ui/button";
import React, { useState } from "react";
import AppointmentTabs from "@/components/appointments/appointmentTabs";
import { X } from "lucide-react";
import ShadSelect from "@/components/misc/shadSelect";
import TextArea from "@/components/FormElements/TextArea";
import Button from "@/components/misc/button";
import { useMutation } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import { useForm } from "react-hook-form";
import { Input } from "@/components/FormElements";
import toast from "react-hot-toast";

const tabs = [
  {
    name: "Lodge an Issue",
    count: 0,
  },
  {
    name: "Drop Feedback",
    count: 0,
  },
];

const feedbackTypes = [
  {
    value: "bug",
    label: "A bug",
  },
  {
    value: "feature",
    label: "A feature request",
  },
  {
    value: "ux-issue",
    label: "User experience issue",
  },
  {
    value: "improvement",
    label: "An improvement",
  },
  {
    value: "other",
    label: "Other",
  },
];

type issueFeedbackType = {
  name: string;
  description: string;
  comment: string;
  type: string;
};

const HelpAndSupportDialog = ({ onClose }: { onClose: () => void }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);
  const [feedbackType, setFeedbackType] = useState("");

  const { postIssue, postFeedback } = useZomujoApi(false).shared.helpSupport;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<issueFeedbackType>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["admin", "helpSupport", selectedTab],
    mutationFn: async (data: issueFeedbackType) => {
      if (selectedTab === "Lodge an Issue") {
        return postIssue(data);
      } else {
        return postFeedback({
          type: feedbackType,
          comment: data.comment,
        });
      }
    },
    onSuccess: () => {
      toast.success(
        selectedTab === "Lodge an Issue"
          ? "Issue lodged successfully"
          : "Feedback submitted successfully",
      );
      onClose();
    },
    onError: () => {
      toast.error("An error occurred. Please try again");
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className="flex w-[490px] flex-col gap-10 rounded-xl bg-white p-6 duration-100"
    >
      <div className="flex flex-row justify-between">
        <div className="rounded-full bg-grayscale-75 p-0.5">
          <AppointmentTabs
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            counts={[0, 0]}
            float={false}
          />
        </div>

        <ShadButton
          onClick={onClose}
          type="button"
          variant="outline"
          className="-mr-1 -mt-1 h-8 w-8 rounded-full p-0 text-black"
        >
          <X className="h-4 w-4 text-black" />
        </ShadButton>
      </div>
      {selectedTab === "Lodge an Issue" ? (
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-1">Title</p>
            <Input
              placeholder="Issue title"
              {...register("name", { required: "This field is required" })}
              error={errors.name}
            />
          </div>
          <div>
            <p className="mb-1">What issue are your experiencing?</p>
            <TextArea
              placeholder="Lodge Issue"
              className="h-[160px] w-full"
              {...register("description", {
                required: "This field is required",
              })}
              error={errors.description}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-1">What kind of feedback is it?</p>
            <ShadSelect
              placeholder="Select option"
              value={feedbackType}
              onChange={setFeedbackType}
              options={feedbackTypes}
            />
          </div>
          <div>
            <p className="mb-1">Comment</p>
            <TextArea
              placeholder="Please describe in details..."
              className="h-[160px] w-full"
              {...register("comment", {
                required: "This field is required",
              })}
              error={errors.comment}
            />
          </div>
        </div>
      )}

      <div className="flex flex-row items-center justify-end gap-3">
        <a href="mailto:support@zomujo.com">
          <ShadButton type="button" variant="outline">
            Contact Support
          </ShadButton>
        </a>
        <Button isLoading={isPending} className="w-fit" primaryClassname="px-4">
          Submit {selectedTab === "Lodge an Issue" ? "Issue" : "Feedback"}
        </Button>
      </div>
    </form>
  );
};
export default HelpAndSupportDialog;

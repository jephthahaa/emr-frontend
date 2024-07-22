import React from "react";
import { Button as ShadButton } from "@/components/ui/button";
import { Input } from "@/components/FormElements";
import Select from "@/components/FormElements/Select";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import { useMutation } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/misc/loadingSpinner";

const StepThreeView = ({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useAppDispatch();
  const reviewData = useAppSelector((state) => state.modal.reviewData!);
  const { patchReview } = useZomujoApi(false).patients;

  const { mutate, isPending } = useMutation({
    mutationKey: ["consultation", "review", "submit"],
    mutationFn: () => patchReview(reviewData.id, reviewData?.data!),
    onSuccess: () => {
      toast.success("Review submitted successfully");
      dispatch(action.modal.setReviewData(undefined));
    },
  });

  return (
    <div className="flex flex-col gap-12">
      <p className="mt-10 text-[32px] font-bold leading-8">
        Doctor&apos;s Expertise
      </p>
      <div className="flex flex-col gap-8">
        <div>
          <Input
            type="number"
            min={0}
            max={10}
            label="How would you rate the doctor's knowledge of your condition?"
            className="border-gray-300"
            placeholder="0-10"
            value={reviewData?.data?.expertise?.knowledge ?? 0}
            onChange={(e) => {
              dispatch(
                action.modal.setReviewDataRating({
                  expertise: {
                    helpful: "",
                    thorough: "",
                    confidence: 0,
                    ...reviewData?.data?.expertise,
                    knowledge: parseInt(e.target.value),
                  },
                }),
              );
            }}
          />
        </div>
        <div>
          <Select
            label="Did the doctor answer your questions thoroughly and clearly?"
            placeholder="Select"
            className="border-gray-300"
            defaultValue=""
            value={reviewData?.data?.expertise?.thorough ?? ""}
            onChange={(e) => {
              dispatch(
                action.modal.setReviewDataRating({
                  expertise: {
                    helpful: "",
                    knowledge: 0,
                    confidence: 0,
                    ...reviewData?.data?.expertise,
                    thorough: e.target.value,
                  },
                }),
              );
            }}
          >
            <option value="" disabled>
              Yes/No
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </div>
        <div>
          <Select
            label="Did you feel confident in the doctor's ability to diagnose and treat your condition?"
            placeholder="Select"
            className="border-gray-300"
            defaultValue=""
            value={reviewData?.data?.expertise?.confidence ?? ""}
            onChange={(e) => {
              dispatch(
                action.modal.setReviewDataRating({
                  expertise: {
                    helpful: "",
                    knowledge: 0,
                    thorough: "",
                    ...reviewData?.data?.expertise,
                    confidence: parseInt(e.target.value),
                  },
                }),
              );
            }}
          >
            <option value="" disabled>
              Yes/No
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </div>
        <div>
          <Select
            label="Did the doctor provide you with helpful advice and treatment recommendations?"
            placeholder="Select"
            className="border-gray-300"
            defaultValue=""
            value={reviewData?.data?.expertise?.helpful ?? ""}
            onChange={(e) => {
              dispatch(
                action.modal.setReviewDataRating({
                  expertise: {
                    thorough: "",
                    knowledge: 0,
                    confidence: 0,
                    ...reviewData?.data?.expertise,
                    helpful: e.target.value,
                  },
                }),
              );
            }}
          >
            <option value="" disabled>
              Yes/No
            </option>
            <option>Yes</option>
            <option>No</option>
          </Select>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <ShadButton
          onClick={() => setCurrentStep((prev) => prev - 1)}
          variant="outline"
          className="px-6"
        >
          Go Back
        </ShadButton>
        <ShadButton
          disabled={isPending}
          onClick={() => mutate()}
          className="h-10 bg-primary px-6 hover:bg-primaryDark"
        >
          {isPending ? (
            <LoadingSpinner size={18} color="#ffffff" />
          ) : (
            "Complete"
          )}
        </ShadButton>
      </div>
    </div>
  );
};

export default StepThreeView;

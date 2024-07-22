import React from "react";
import { Button as ShadButton } from "@/components/ui/button";
import Select from "@/components/FormElements/Select";
import { Input } from "@/components/FormElements";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";

const StepTwoView = ({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useAppDispatch();
  const reviewData = useAppSelector((state) => state.modal.reviewData!);

  return (
    <div className="flex flex-col gap-12">
      <p className="mt-10 text-[32px] font-bold leading-8">
        Doctor&apos;s Communication Skills
      </p>
      <div className="flex flex-col gap-8">
        <div>
          <Select
            label="Did you find the doctor to be professional and courteous?"
            placeholder="Select"
            className="border-gray-300"
            defaultValue=""
            value={reviewData?.data?.communicationSkill?.isProfessional ?? ""}
            onChange={(e) => {
              dispatch(
                action.modal.setReviewDataRating({
                  communicationSkill: {
                    isAttentive: "",
                    isClear: 0,
                    isComfortable: "",
                    ...reviewData?.data?.communicationSkill,
                    isProfessional: e.target.value,
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
          <Input
            type="number"
            min={0}
            max={10}
            label="How would you rate the doctor's ability to explain medical information?"
            className="border-gray-300"
            placeholder="0-10"
            value={reviewData?.data?.communicationSkill?.isClear ?? 0}
            onChange={(e) => {
              dispatch(
                action.modal.setReviewDataRating({
                  communicationSkill: {
                    isAttentive: "",
                    isProfessional: "",
                    isComfortable: "",
                    ...reviewData?.data?.communicationSkill,
                    isClear: parseInt(e.target.value),
                  },
                }),
              );
            }}
          />
        </div>
        <div>
          <Select
            label="Did the doctor listen attentively to your concerns?"
            placeholder="Select"
            className="border-gray-300"
            defaultValue=""
            value={reviewData?.data?.communicationSkill?.isAttentive ?? ""}
            onChange={(e) => {
              dispatch(
                action.modal.setReviewDataRating({
                  communicationSkill: {
                    isProfessional: "",
                    isClear: 0,
                    isComfortable: "",
                    ...reviewData?.data?.communicationSkill,
                    isAttentive: e.target.value,
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
            label="Were you comfortable communicating with the doctor online?"
            placeholder="Select"
            className="border-gray-300"
            defaultValue=""
            value={reviewData?.data?.communicationSkill?.isComfortable ?? ""}
            onChange={(e) => {
              dispatch(
                action.modal.setReviewDataRating({
                  communicationSkill: {
                    isProfessional: "",
                    isClear: 0,
                    isAttentive: "",
                    ...reviewData?.data?.communicationSkill,
                    isComfortable: e.target.value,
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
          onClick={() => setCurrentStep((prev) => prev + 1)}
          className="bg-primary px-6 hover:bg-primaryDark"
        >
          Continue
        </ShadButton>
      </div>
    </div>
  );
};

export default StepTwoView;

import React, { useEffect, useState } from "react";
import { Button as ShadButton } from "@/components/ui/button";
import { cn } from "@/utils";
import TextArea from "@/components/FormElements/TextArea";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { action } from "@/redux";
import { useDebounce } from "@/hooks/useDebouce";

const RATINGS = [
  {
    emoji: "😍",
    label: "Satified",
  },
  {
    emoji: "😊",
    label: "Happy",
  },
  {
    emoji: "😌",
    label: "Content",
  },
  {
    emoji: "😐",
    label: "Okay",
  },
  {
    emoji: "🙁",
    label: "Bad",
  },
  {
    emoji: "😞",
    label: "Disatisfied",
  },
];

const StepOneView = ({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useAppDispatch();
  const reviewData = useAppSelector((state) => state.modal.reviewData!);
  const [text, setText] = useState(reviewData?.data?.comment ?? "");
  const deboucedText = useDebounce(text, 500);

  useEffect(() => {
    dispatch(action.modal.setReviewDataRating({ comment: deboucedText }));
  }, [deboucedText, dispatch]);

  return (
    <div className="flex flex-col">
      <div className="mt-10 flex flex-col items-center gap-8 text-center">
        <p className="text-[32px] font-bold leading-8">
          How was your experience with Dr{" "}
          {`${reviewData.doctor.firstName} ${reviewData.doctor.lastName}`}
        </p>
        <p className="font-medium leading-4 text-gray-600">
          How was your experience with Dr{" "}
          {`${reviewData.doctor.firstName} ${reviewData.doctor.lastName}`}
        </p>
      </div>
      <div className="my-14 flex h-28 flex-row items-center justify-between">
        {RATINGS.map((item, i) => (
          <Emoji
            key={item.label}
            item={item}
            selected={reviewData?.data?.rating === RATINGS.length - i - 1}
            setSelected={(val) => {
              const ReverseIndex = RATINGS.length - i - 1;
              dispatch(
                action.modal.setReviewDataRating({ rating: ReverseIndex }),
              );
            }}
          />
        ))}
      </div>
      <TextArea
        label="Add a comment"
        onChange={(e) => {
          setText(e.target.value);
        }}
        labelClassName="text-base"
        placeholder="Please share anything that will help prepare for the consult"
        rows={5}
      />
      <div className="mt-12 flex flex-row items-center justify-between">
        <div className=""></div>
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

const Emoji = ({
  item,
  selected,
  setSelected,
}: {
  item: { emoji: string; label: string };
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        onClick={() => setSelected(item.emoji)}
        className={cn(
          "flex shrink-0 cursor-pointer items-center justify-center rounded-full duration-100",
          selected
            ? "h-28 w-28 border-[8px] border-gray-100 bg-gradient-to-b from-[#B7D36A] to-[#08AF85] shadow-emoji"
            : "h-[72px] w-[72px] border-[6px] border-gray-200 bg-gray-200",
        )}
      >
        <p
          className={cn(
            "translate-y-0.5 duration-100",
            selected
              ? "text-[64px] leading-[64px]"
              : "text-[48px] leading-[48px] grayscale",
          )}
        >
          {item.emoji}
        </p>
      </div>
      <motion.div
        initial={{
          opacity: selected ? 1 : 0,
          y: selected ? 0 : 20,
        }}
        animate={{
          opacity: selected ? 1 : 0,
          y: selected ? 0 : 20,
        }}
        transition={{
          duration: 0.1,
        }}
        className="w-fit rounded-md bg-primaryDark px-3 py-1.5 text-xs text-white"
      >
        <p>{item.label}</p>
      </motion.div>
    </div>
  );
};

export default StepOneView;

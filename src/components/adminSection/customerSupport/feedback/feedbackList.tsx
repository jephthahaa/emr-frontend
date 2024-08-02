import React from "react";
import FeedbackItem from "@/components/adminSection/customerSupport/feedback/feedbackItem";
import { IFeedback, IIssue } from "@/types";
import { Button } from "@/components/ui/button";

type FeedbackListProps = {
  data?: IFeedback[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (page: number) => void;
};

const FeedbackList = ({
  data = [],
  currentPage,
  totalPages,
  onChangePage,
}: FeedbackListProps) => {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll rounded-2xl bg-background p-7">
        {data.map((item, i) => (
          <FeedbackItem key={item.id} feedback={item} />
        ))}
      </div>
      <div className="flex flex-row items-center justify-end">
        <div className="flex flex-row items-center justify-end">
          <Button
            onClick={() => onChangePage?.(currentPage! - 1)}
            disabled={currentPage === 1}
            className="w-16"
            variant="outline"
          >
            Prev
          </Button>
          <div className="flex w-[80px] items-center justify-center font-mono">
            {currentPage} of {totalPages}
          </div>
          <Button
            onClick={() => onChangePage?.(currentPage! + 1)}
            disabled={currentPage === totalPages}
            className="w-16"
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FeedbackList;

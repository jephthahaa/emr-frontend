import Button from "@/components/misc/button";
import { Slider } from "@/components/ui/slider";
import useZomujoApi from "@/services/zomujoApi";
import { interpolateRange } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MIN_AMOUNT = 20;
const MAX_AMOUNT = 300;

const MIN_SESSION = 30;
const MAX_SESSION = 120;

const PricingView = () => {
  const [amount, setCurrentAmount] = useState(MIN_AMOUNT);
  const [lengthOfSession, setCurrentSessionLength] = useState(MIN_SESSION);

  const {
    shared: { getUserDetails },
    doctors: {
      settings: { setRate },
    },
  } = useZomujoApi(false);

  const { data: userDetails } = useQuery({
    queryKey: ["user", "details"],
    queryFn: getUserDetails,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["settings", "personal"],
    mutationFn: setRate,
    onSuccess: () => {
      toast.success("Rates updated successfully");
    },
  });

  useEffect(() => {
    if (userDetails) {
      if (userDetails.rate) {
        setCurrentAmount(userDetails.rate.amount);
        setCurrentSessionLength(userDetails.rate.lengthOfSession);
      }
    }
  }, [userDetails]);

  return (
    <div className="ml-6 flex w-[454px] flex-col items-end gap-24">
      <div className="relative flex w-full flex-1 flex-col gap-4 ">
        <p className="text-sm">Select amount</p>
        <Slider
          value={[amount]}
          onValueChange={(value) => setCurrentAmount(value[0])}
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          step={5}
        />
        <motion.div
          style={{
            x: `${interpolateRange(
              amount,
              MIN_AMOUNT,
              MAX_AMOUNT,
              -24,
              454 - 32 - 8,
            )}px`,
          }}
          className="absolute top-[calc(100%+8px)] flex h-8 w-16 items-center justify-center rounded-full bg-primary"
        >
          <p className="text-sm text-white">₵{amount}</p>
        </motion.div>
      </div>
      <div className="relative flex w-full flex-1 flex-col gap-4 ">
        <p className="text-sm">Length of session</p>
        <Slider
          value={[lengthOfSession]}
          onValueChange={(value) => setCurrentSessionLength(value[0])}
          min={MIN_SESSION}
          max={MAX_SESSION}
          step={5}
        />
        <motion.div
          style={{
            x: `${interpolateRange(
              lengthOfSession,
              MIN_SESSION,
              MAX_SESSION,
              -27.75,
              454 - 37 - 9.25,
            )}px`,
          }}
          className="absolute top-[calc(100%+8px)] flex h-8 w-[74px] items-center justify-center rounded-full bg-primary px-2.5"
        >
          <p className="text-sm text-white">{lengthOfSession} mins</p>
        </motion.div>
      </div>
      <Button
        variant="primary"
        onClick={() =>
          mutate({
            amount,
            lengthOfSession,
          })
        }
        isLoading={isPending}
        className="w-fit"
        primaryClassname="w-[130px]"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default PricingView;

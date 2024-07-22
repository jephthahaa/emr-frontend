import { Checkbox } from "@/components/FormElements";
import Button from "@/components/misc/button";
import SingleImageDropzone from "@/components/misc/dropzones/singleFileDropzone";
import { InfoIcon } from "lucide-react";
import React, { useState } from "react";
import { useDoctorSignupContext } from "../contexts/doctorSignupProvider";

const DoctorIDStep = () => {
  const { register, watch, setValue } = useDoctorSignupContext();
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-1.5">
        <p className="flex flex-row items-center gap-1 text-[32px] font-bold leading-8">
          Upload doctor’s ID
          <span>
            <InfoIcon size={16} />
          </span>
        </p>
        <p className="leading-6 text-[#6B7280]">
          We require both sides of ID Card
        </p>
      </div>
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-row justify-between">
          <SingleImageDropzone
            dropzoneOptions={{
              maxFiles: 1,
              accept: {
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
              },
              maxSize: 5 * 1024 * 1024,
            }}
            height={280}
            width={300}
            label="Front"
            value={watch("front")}
            {...register("front")}
            onChange={(file) => setValue("front", file!)}
          />
          <SingleImageDropzone
            dropzoneOptions={{
              maxFiles: 1,
              accept: {
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
              },
              maxSize: 5 * 1024 * 1024,
            }}
            height={280}
            width={300}
            label="Back"
            value={watch("back")}
            {...register("back")}
            onChange={(file) => setValue("back", file!)}
          />
        </div>
        <div className="flex flex-row">
          <Checkbox
            labelClassName="text-gray-500"
            checked={confirm}
            onChange={(e) => setConfirm(e.target.checked)}
            labelText="I confirm that the ID provided is a valid  government issued doctor ID. This ID includes my name, ID number and expiry date"
          />
        </div>
      </div>
      <Button
        disabled={
          watch("front") === undefined ||
          watch("back") === undefined ||
          !confirm
        }
        type="submit"
      >
        Continue
      </Button>
    </div>
  );
};

export default DoctorIDStep;

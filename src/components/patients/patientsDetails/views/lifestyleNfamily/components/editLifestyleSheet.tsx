import { z } from "zod";
import { Input } from "../../../../../FormElements";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, wait } from "@/utils";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import Button from "@/components/misc/button";
import TextArea from "@/components/FormElements/TextArea";
import { useState } from "react";
import { IPatient } from "@/types";
import { Slider } from "@/components/ui/slider";

const MaritalStatus = [
  {
    id: "single",
    label: "Single",
  },
  {
    id: "married",
    label: "Married",
  },
  {
    id: "divorced",
    label: "Divorced",
  },
  {
    id: "widowed",
    label: "Widowed",
  },
];

const SmokingStatus = [
  {
    id: "never-smoked",
    label: "Never Smoked",
  },
  {
    id: "ex-smoker",
    label: "Ex-Smoker",
  },
  {
    id: "current-smoker",
    label: "Current Smoker",
  },
];

const alcoholStatus = [
  {
    id: "non-drinker",
    label: "Non Drinker",
  },
  {
    id: "ex-drinker",
    label: "Ex-Drinker",
  },
  {
    id: "current-drinker",
    label: "Current Drinker",
  },
];

const occupationTypeOptions = [
  {
    id: "unemployed",
    label: "Unemployed",
  },
  {
    id: "employed",
    label: "Employed",
  },
  {
    id: "student",
    label: "Student",
  },
];

const parentStatusOptions = [
  {
    id: "both-alive",
    label: "Both Alive",
  },
  {
    id: "both-deceased",
    label: "Both Deceased",
  },
  {
    id: "mother-alive",
    label: "Mother Alive",
  },
  {
    id: "father-alive",
    label: "Father Alive",
  },
];

const formSchema = z.object({
  occupation: z.string(),
  parents: z.object({
    maritalStatus: z.string(),
    livingStatus: z.string(),
    married: z.boolean(),
  }),
  stress: z.number(),
  additionalNotes: z.string(),
  socialHistory: z.string(),
  alcohol: z.object({
    status: z.string(),
    yearsOfDrinking: z.number(),
  }),
  smoking: z.object({
    status: z.string(),
    yearsOfSmoking: z.number(),
  }),
  familyHistory: z.string(),
});

type FormFields = z.infer<typeof formSchema>;

const EditLifestyleSheet = ({
  lifestyle,
  onClose,
}: {
  lifestyle: IPatient["lifestyle"];
  onClose: () => void;
}) => {
  const { id } = useParams<{ id: string }>();

  const queryClient = useQueryClient();
  const { patchPatientRecord } = useZomujoApi(false).doctors.records;

  const defaultValues: FormFields = {
    additionalNotes: lifestyle?.additionalNotes ?? "",
    alcohol: lifestyle?.alcohol ?? {
      status: alcoholStatus[0].id,
      yearsOfDrinking: 0,
    },
    familyHistory: lifestyle?.familyHistory ?? "",
    occupation: lifestyle?.occupation ?? "other",
    parents: lifestyle?.parents ?? {
      livingStatus: parentStatusOptions[0].id,
      maritalStatus: MaritalStatus[0].id,
      married: false,
    },
    smoking: lifestyle?.smoking ?? {
      status: SmokingStatus[0].id,
      yearsOfSmoking: 0,
    },
    socialHistory: lifestyle?.socialHistory ?? "",
    stress: lifestyle?.stress ?? 0,
  };

  const { watch, setValue, handleSubmit, register } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["patient", "details", "lifestyle", id],
    mutationFn: (data: FormFields) =>
      patchPatientRecord(id, { lifestyle: data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["patients", "details", "full-records", id],
      });
      toast.success("Patient details updated successfully!");
      await wait(500);
      onClose();
    },
    onError: () => {
      toast.error("An error occured");
    },
  });

  const [occupationType, setOccupationType] = useState(
    occupationTypeOptions[0].id,
  );

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className="flex flex-col gap-6 p-7"
    >
      <p className="text-2xl font-bold leading-5">
        Edit lifestyle and family history
      </p>
      <div className="flex h-[calc(100vh-194px)] flex-col gap-6 overflow-y-scroll">
        <div className="flex flex-col gap-1.5">
          <p className="font-medium">Occupation Type</p>
          <div className="flex flex-row gap-4">
            {occupationTypeOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setOccupationType(option.id)}
                className={cn(
                  "flex flex-row items-center gap-1.5 rounded-full px-4 py-1.5 duration-100",
                  option.id === occupationType
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200 ",
                )}
              >
                <p className="text-sm">{option.label}</p>
              </button>
            ))}
          </div>
          {occupationType === occupationTypeOptions[1].id && (
            <div>
              <Input
                label="Occupation"
                placeholder="Specify"
                {...register("occupation", { required: true })}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <TextArea
            label="Additional Notes"
            className="h-28"
            placeholder="Type something"
            {...register("additionalNotes")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <TextArea
            label="Social Notes"
            className="h-28"
            placeholder="Type something"
            {...register("socialHistory")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="font-medium">Stress level</p>
          <div className="flex flex-1 flex-row gap-2">
            <Slider
              value={[watch("stress")]}
              onValueChange={(value) => setValue("stress", value[0])}
              min={0}
              max={10}
              step={1}
            />
            <div
              className={cn(
                "flex flex-row items-center gap-1.5 rounded-full px-4 py-1.5 duration-100",
                "bg-gray-100 text-black hover:bg-gray-200 ",
              )}
            >
              <p className="shrink-0 text-sm">{watch("stress")}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="font-medium">Drinking</p>
          <div className="flex flex-row gap-4">
            {alcoholStatus.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setValue("alcohol.status", option.id)}
                className={cn(
                  "flex flex-row items-center gap-1.5 rounded-full px-4 py-1.5 duration-100",
                  option.id === watch("alcohol.status")
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200 ",
                )}
              >
                <p className="shrink-0 text-sm">{option.label}</p>
              </button>
            ))}
          </div>
        </div>

        {watch("alcohol.status") !== alcoholStatus[0].id && (
          <div className="flex flex-col gap-1.5">
            <p className="font-medium">Years of Drinking</p>
            <Input
              className="w-full border-gray-200 bg-white"
              type="number"
              placeholder="Years of drinking"
              {...register("alcohol.yearsOfDrinking")}
            />
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <p className="font-medium">Smoking</p>
          <div className="flex flex-row gap-4">
            {SmokingStatus.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setValue("smoking.status", option.id)}
                className={cn(
                  "flex flex-row items-center gap-1.5 rounded-full px-4 py-1.5 duration-100",
                  option.id === watch("smoking.status")
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200 ",
                )}
              >
                <p className="shrink-0 text-sm">{option.label}</p>
              </button>
            ))}
          </div>
        </div>
        {watch("smoking.status") !== SmokingStatus[0].id && (
          <div className="flex flex-col gap-1.5">
            <p className="font-medium">Years of smoking</p>
            <Input
              className="w-full border-gray-200 bg-white"
              type="number"
              placeholder="Years of smoking"
              {...register("smoking.yearsOfSmoking")}
            />
          </div>
        )}
        <div className="flex flex-col gap-2.5">
          <p className="font-medium">Parents</p>
          <div className="flex flex-row gap-4">
            {MaritalStatus.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setValue("parents.maritalStatus", option.id)}
                className={cn(
                  "flex flex-row items-center gap-1.5 rounded-full px-4 py-1.5 duration-100",
                  option.id === watch("parents.maritalStatus")
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200 ",
                )}
              >
                <p className="shrink-0 text-sm">{option.label}</p>
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-row flex-wrap gap-4">
            {parentStatusOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setValue("parents.livingStatus", option.id)}
                className={cn(
                  "flex flex-row items-center gap-1.5 rounded-full px-4 py-1.5 duration-100",
                  option.id === watch("parents.livingStatus")
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200 ",
                )}
              >
                <p className="shrink-0 text-sm">{option.label}</p>
              </button>
            ))}
          </div>
          <div className="mt-2.5 flex flex-col gap-1.5">
            <TextArea
              label="Family History"
              className="h-28"
              placeholder="Type something"
              {...register("familyHistory")}
            />
          </div>
        </div>
      </div>
      <Button isLoading={isPending}>Save</Button>
    </form>
  );
};

export default EditLifestyleSheet;

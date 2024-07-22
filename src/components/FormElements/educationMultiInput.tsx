import React, { useState } from "react";
import { Input } from "./Input";
import { Button } from "../ui/button";
import { GripVertical, MoreVertical, Plus } from "lucide-react";
import { cn } from "@/utils";
import { Label } from "./Label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Reorder, motion } from "framer-motion";
import { ZodError, z } from "zod";
import toast from "react-hot-toast";

type IEducation = {
  degree: string;
  school: string;
};

const educationSchema = z.object({
  degree: z.string({ required_error: "degree is required" }).min(1),
  school: z.string({ required_error: "school is required" }).min(1),
});

const EducationMultiInput = ({
  label,
  dataList,
  setDataList,
}: {
  dataList: IEducation[];
  setDataList: (data: IEducation[]) => void;
  label?: string;
}) => {
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");

  const onSave = async (data: IEducation) => {
    try {
      const newEdu = await educationSchema.parseAsync(data);
      const newList = [...dataList, newEdu];
      setDataList(newList);
      setSchool("");
      setDegree("");
    } catch (error) {
      const err: ZodError = error as unknown as ZodError;
      const errors = err.flatten().fieldErrors;
      for (const key in errors) {
        toast.error(`${key}: ${errors[key]}`);
      }
    }
  };

  return (
    <>
      {label && <Label>{label}</Label>}
      <div className="flex h-fit flex-col rounded-xl border border-gray-200 p-1.5">
        <div className="flex h-fit flex-col gap-1">
          <Reorder.Group axis="y" values={dataList} onReorder={setDataList}>
            {dataList.map((item, idx) => (
              <Reorder.Item key={item.degree} value={item}>
                <motion.div className="flex min-h-[40px] flex-row items-center gap-1 rounded-lg py-0.5 duration-100 hover:bg-gray-200 focus:bg-gray-200">
                  <GripVertical
                    size={20}
                    className={cn(
                      "text-gray-400 duration-100",
                      false && "text-primaryLightBase",
                    )}
                  />
                  <div className="flex-1">
                    <div className="flex flex-col justify-center">
                      <p className="font-bold text-gray-600">{item.degree}</p>
                      <p className="text-sm font-medium text-gray-500">
                        {item.school}
                      </p>
                    </div>
                  </div>
                  <ItemOptions
                    elemIdx={idx}
                    dataList={dataList}
                    setDataList={setDataList}
                  />
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        {dataList.length !== 0 && <hr className="my-1.5" />}
        <div className="flex h-fit flex-row items-end gap-2">
          <div className="flex flex-1 flex-col gap-0.5">
            <Input
              placeholder="Bachelor of Science - Pyscology"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="bg-white"
            />
            <Input
              placeholder="University of Ghana, Legon"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="bg-white"
            />
          </div>
          <Button
            type="button"
            onClick={() => onSave({ degree, school })}
            variant={"outline"}
            className="w-[100px] rounded-lg border-gray-300"
          >
            <Plus />
          </Button>
        </div>
      </div>
    </>
  );
};

const ItemOptions = ({
  elemIdx,
  dataList,
  setDataList,
}: {
  elemIdx: number;
  dataList: IEducation[];
  setDataList: (data: IEducation[]) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <MoreVertical
            size={20}
            className={cn(
              "text-gray-400 duration-100",
              false && "text-primaryLightBase",
            )}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setDataList(dataList.filter((elem, i) => i !== elemIdx));
            }}
          >
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EducationMultiInput;

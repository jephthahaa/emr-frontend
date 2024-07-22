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

const MultiInput = ({
  label,
  dataList,
  setDataList,
}: {
  dataList: string[];
  setDataList: (data: string[]) => void;
  label?: string;
}) => {
  const [text, setText] = useState("");

  const onSave = (text: string) => {
    if (text === "") {
      return;
    }
    const newList = [...dataList, text];
    setDataList(newList);
    setText("");
  };

  return (
    <>
      {label && <Label>{label}</Label>}
      <div className="flex h-fit flex-col rounded-xl border border-gray-200 p-1.5">
        <div className="flex h-fit flex-col gap-1">
          <Reorder.Group axis="y" values={dataList} onReorder={setDataList}>
            {dataList.map((item, idx) => (
              <Reorder.Item key={item} value={item}>
                <motion.div className="flex h-10 flex-row items-center gap-1 rounded-lg py-0.5 duration-100 hover:bg-gray-200 focus:bg-gray-200">
                  <GripVertical
                    size={20}
                    className={cn(
                      "text-gray-400 duration-100",
                      false && "text-primaryLightBase",
                    )}
                  />
                  <div className="flex-1">
                    <p>{item}</p>
                  </div>
                  <ItemOptions
                    item={item}
                    dataList={dataList}
                    setDataList={setDataList}
                  />
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        {dataList.length !== 0 && <hr className="my-1.5" />}
        <div className="flex h-fit flex-row gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-white"
          />
          <Button
            type="button"
            onClick={() => onSave(text)}
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
  item,
  dataList,
  setDataList,
}: {
  item: string;
  dataList: string[];
  setDataList: (data: string[]) => void;
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
              setDataList(dataList.filter((elem) => item !== elem));
            }}
          >
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiInput;

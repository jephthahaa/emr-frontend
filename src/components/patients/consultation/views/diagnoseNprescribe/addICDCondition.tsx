import { Input } from "@/components/FormElements";
import Button from "@/components/misc/button";
import Chip from "@/components/misc/chip";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useDebounce } from "@/hooks/useDebouce";
import { action } from "@/redux";
import { AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import React, { useState } from "react";

const Conditions = [
  {
    code: "l11.00",
    name: "heart failure",
  },
  {
    code: "l12.00",
    name: "Heart Disease",
  },
  {
    code: "l13.00",
    name: "Hypertensive",
  },
  {
    code: "l14.00",
    name: "Hypertensive Heart Disease",
  },
];

const AddICDCondition = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const deboucedSearch = useDebounce(search, 500);

  const selectedConditions = useAppSelector(
    (state) => state.consultation.consultationState.diagnosis,
  );

  const filteredConditions = Conditions.filter((condition) => {
    return condition.name.toLowerCase().includes(deboucedSearch.toLowerCase());
  });

  return (
    <div className="flex w-[560px] flex-col gap-2">
      <div className="rounded-md bg-white p-0.5">
        <Input
          className="w-full border-transparent outline-none"
          placeholder="Search ICD condition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search />}
        />
      </div>
      <div className="flex w-full flex-col gap-4 rounded-md bg-white p-4">
        <p className="text-xs font-medium">Recent added ICDs</p>
        <div className="flex flex-row items-center gap-3">
          {["Asthma", "Ulcer", "Hypertensive Heart Disease"].map((icd) => (
            <div
              key={icd}
              className="flex flex-row items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-black duration-100 hover:bg-gray-200"
            >
              <p className="text-xs">{icd}</p>
              <button>
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        <hr />
        <div className="h- flex h-[172px] flex-col gap-1 overflow-y-scroll">
          {filteredConditions.map((condition) => (
            <div
              onClick={() => {
                dispatch(
                  action.consultation.addDiagnosis({ ...condition, notes: "" }),
                );
                onClose();
              }}
              key={condition.code}
              className="flex h-10 shrink-0 cursor-pointer flex-row items-center gap-2.5 rounded-md px-2.5 py-1 duration-100 hover:bg-gray-100"
            >
              <Chip text={condition.code} varient="red" />
              <p className="text-sm">{condition.name}</p>
            </div>
          ))}
          <AnimatePresence>
            {filteredConditions.length === 0 && (
              <div className="flex h-full w-full flex-col items-center gap-3">
                <p className="text-center text-gray-500">No conditions found</p>

                <Button
                  onClick={() => {
                    dispatch(
                      action.consultation.addDiagnosis({
                        code: `P1${selectedConditions.length}.00`,
                        name: search,
                        notes: "",
                      }),
                    );
                    onClose();
                  }}
                  className="w-[200px]"
                >
                  Add New Condition
                </Button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AddICDCondition;

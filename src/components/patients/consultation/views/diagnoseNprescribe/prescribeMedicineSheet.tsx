import { Input } from "@/components/FormElements";
import Select from "@/components/FormElements/Select";
import TextArea from "@/components/FormElements/TextArea";
import MultiSelect from "@/components/FormElements/multiSelect";
import Button from "@/components/misc/button";
import { useAppDispatch } from "@/hooks";
import { useDebounce } from "@/hooks/useDebouce";
import { action } from "@/redux";
import { AnimatePresence, motion } from "framer-motion";
import { Info, Search } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";

const dosageList = [
  {
    label: "1 tablet, 1 x per day",
    value: "1 tablet, 1 x per day",
  },
  {
    label: "1 tablet, 2 x per day",
    value: "1 tablet, 2 x per day",
  },
  {
    label: "1 tablet, 3 x per day",
    value: "1 tablet, 3 x per day",
  },
  {
    label: "1 tablet, 4 x per day",
    value: "1 tablet, 4 x per day",
  },
  {
    label: "specify",
    value: "specify",
  },
];

const instructionsList = [
  {
    label: "Before meal",
    value: "Before meal",
  },
  {
    label: "After meal",
    value: "After meal",
  },
  {
    label: "With meal",
    value: "With meal",
  },
  {
    label: "Without meal",
    value: "Without meal",
  },
];

const PrescribeMedicineSheet = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const [option, setOption] = useState("prescribe");
  const [dosage, setDosage] = useState(dosageList[0].value);
  const [instructions, setInstructions] = useState(instructionsList[0].value);
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [dosageSpec, setDosageSpec] = useState({
    amount: 1,
    frequency: 1,
  });
  const [duration, setDuration] = useState({
    value: 1,
    unit: "days",
  });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const getMedicines = useZomujoApi().doctors.records.getMedicines;

  const { data, isLoading } = useQuery({
    queryKey: ["medicines", debouncedSearch],
    queryFn: () => getMedicines({ limit: 15, search: debouncedSearch }),
  });

  const medicineList = data?.data ?? [];

  const filteredMedicineList = medicineList.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <div className="flex flex-col p-5">
      <p className="mb-6 text-2xl font-bold leading-6">Prescribe Medicine</p>
      <div className="flex h-[calc(100vh-32px-128px-24px)] flex-col overflow-y-scroll pt-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 px-0.5">
            <p className="font-medium leading-4">Medicine</p>
            <Input
              icon={<Search size={18} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a medcine"
              className="border-gray-300"
            />
          </div>
        </div>
        {filteredMedicineList.length > 1 ? (
          <div className="mt-6 flex flex-col gap-1">
            {filteredMedicineList.map((item) => (
              <div
                onClick={() => {
                  setSearch(item.name);
                }}
                key={item.id}
                className="flex h-10 shrink-0 cursor-pointer flex-row items-center gap-2.5 rounded-md px-2.5 py-1 duration-100 hover:bg-gray-100"
              >
                <p className="text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-1">
            {filteredMedicineList.map((item) => (
              <div
                onClick={() => {
                  setSearch(item.name);
                }}
                key={item.id}
                className="min-h-10 flex shrink-0 cursor-pointer flex-col justify-center gap-1 rounded-md px-2.5 py-1 duration-100 hover:bg-gray-100"
              >
                <p className="text-sm">{item.name}</p>
                <div>
                  <p className={"text-xs text-gray-400"}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <AnimatePresence>
          {(filteredMedicineList.length === 0 ||
            filteredMedicineList[0].name === debouncedSearch) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <hr className="my-6 border-gray-200" />
              <div className="mb-8 flex flex-row items-center gap-1">
                <p className="text-xl font-bold leading-5">Medicine Option</p>
                <Info size={16} />
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                  <Select
                    labelClassName="text-base"
                    label="Presctibe / Dispense"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                  >
                    <option value="prescribe">Prescribe</option>
                    <option value="dispense">Dispense</option>
                  </Select>
                </div>

                <div className="flex flex-col gap-3">
                  <MultiSelect
                    label="Dosage"
                    options={dosageList}
                    selected={dosage}
                    setSelected={setDosage}
                  />
                  {dosage === "specify" && (
                    <div className="flex flex-1 flex-row items-center gap-3">
                      <Input
                        type="number"
                        min={1}
                        value={dosageSpec.amount}
                        onChange={(e) =>
                          setDosageSpec({
                            ...dosageSpec,
                            amount: parseInt(e.target.value),
                          })
                        }
                        className="ml-0.5 w-[60px]"
                      />
                      <p>tablet,</p>
                      <Input
                        type="number"
                        min={1}
                        value={dosageSpec.frequency}
                        onChange={(e) =>
                          setDosageSpec({
                            ...dosageSpec,
                            frequency: parseInt(e.target.value),
                          })
                        }
                        className="w-[60px]"
                      />
                      <p>x per day</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-1">
                    <p className="font-medium leading-4">Duration</p>
                    <Info size={14} />
                  </div>
                  <div className="flex flex-1 flex-row items-center gap-3">
                    <Input
                      type="number"
                      min={1}
                      value={duration.value}
                      onChange={(e) =>
                        setDuration({
                          ...duration,
                          value: parseInt(e.target.value),
                        })
                      }
                      className="ml-0.5 flex-1"
                    />
                    <Select
                      value={duration.unit}
                      onChange={(e) =>
                        setDuration({
                          ...duration,
                          unit: e.target.value,
                        })
                      }
                      className="min-w-[120px] flex-1"
                    >
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                    </Select>
                  </div>
                </div>

                <MultiSelect
                  label="Instructions"
                  options={instructionsList}
                  selected={instructions}
                  setSelected={setInstructions}
                />

                <div className="flex flex-col gap-1">
                  <TextArea
                    className="h-28"
                    value={additionalInstructions}
                    onChange={(e) => setAdditionalInstructions(e.target.value)}
                    label="Additional Instructions"
                    labelClassName="text-base"
                    placeholder="Enter additional notes"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Button
        type="button"
        onClick={() => {
          dispatch(
            action.consultation.addPrescription({
              medicine: search,
              dosage:
                dosage === "specify"
                  ? `${dosageSpec.amount} tablet, ${dosageSpec.frequency} x per day`
                  : dosage,
              duration: `${duration.value} ${duration.unit}`,
              instructions,
              repeat: "",
              option: option as "prescribe" | "dispense",
              additionalInstructions,
            }),
          );
          onClose();
        }}
        variant="primary"
        className="mt-5"
      >
        Add Prescription
      </Button>
    </div>
  );
};

export default PrescribeMedicineSheet;

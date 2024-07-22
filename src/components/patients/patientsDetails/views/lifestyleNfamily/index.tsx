import Sheet from "@/components/misc/sheet";
import { Button } from "@/components/ui/button";
import React from "react";
import Accordion, { AccordianItem } from "./components/accordion";
import EditLifestyleSheet from "./components/editLifestyleSheet";
import { IPatient } from "@/types";
import { isServiceMode } from "@/constants";

const PatientLifestyleAndFamily = ({ patient }: { patient?: IPatient }) => {
  const lifestyle = patient?.lifestyle;
  return (
    <main className="flex h-[calc(100vh-164px)] flex-1 flex-col items-center gap-12 overflow-scroll p-6">
      <div className="flex w-full flex-row items-center justify-between">
        <p className="text-xl font-bold">Lifestyle and Family History</p>
        {isServiceMode("DOCTOR") && (
          <Sheet
            sheetChild={({ onClose }) => (
              <EditLifestyleSheet lifestyle={lifestyle!} onClose={onClose} />
            )}
          >
            <Button className="w-20" variant="outline">
              Edit
            </Button>
          </Sheet>
        )}
      </div>
      <div className="flex w-[500px] flex-col gap-6">
        <Accordion label="Lifestyle">
          <div className="flex flex-col gap-8 pt-8">
            <AccordianItem
              label="Occupation"
              chipValues={lifestyle?.occupation ? [lifestyle?.occupation] : []}
              isChip
            />

            <AccordianItem
              label="Stress level"
              chipValues={[`${lifestyle?.stress ?? 0}`]}
              isChip
            />

            <AccordianItem
              label="Additional Notes"
              placeholder="No notes added"
              isChip={false}
              value={lifestyle?.additionalNotes ?? ""}
            />
            <AccordianItem
              label="Social History"
              placeholder="No history added"
              isChip={false}
              value={lifestyle?.socialHistory ?? ""}
            />
            <AccordianItem
              label="Alcohol"
              chipValues={[lifestyle?.alcohol.status ?? ""]}
              isChip
            />
            <AccordianItem
              label="Years of Drinking"
              chipValues={[`${lifestyle?.alcohol.yearsOfDrinking ?? 0} Years`]}
              isChip
            />
            <AccordianItem
              label="Smoking"
              chipValues={[lifestyle?.smoking.status ?? ""]}
              isChip
            />
            <AccordianItem
              label="Years of Smoking"
              chipValues={[`${lifestyle?.smoking.yearsOfSmoking ?? 0} Years`]}
              isChip
            />
          </div>
        </Accordion>
        <Accordion label="Family History">
          <div className="flex flex-col gap-8 pt-8">
            <AccordianItem
              label="Parents"
              chipValues={[
                lifestyle?.parents.maritalStatus ?? "",
                lifestyle?.parents.livingStatus ?? "",
              ]}
              isChip
            />
            <AccordianItem
              label="Notes"
              isChip={false}
              placeholder="No family history"
              value={lifestyle?.familyHistory ?? ""}
            />
          </div>
        </Accordion>
      </div>
    </main>
  );
};

export default PatientLifestyleAndFamily;

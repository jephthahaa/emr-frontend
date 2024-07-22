import React from "react";
import Sheet from "@/components/misc/sheet";
import { Button } from "@/components/ui/button";
import Accordion, {
  AccordianItem,
} from "../lifestyleNfamily/components/accordion";
import EditGynaeSheet from "./components/editGynaeSheet";
import { IPatient } from "@/types";

const PatientGyaenacology = ({ patient }: { patient?: IPatient }) => {
  return (
    <main className="flex h-[calc(100vh-164px)] flex-1 flex-col items-center gap-12 overflow-scroll p-6">
      {patient?.gender === "female" ? (
        <>
          <div className="flex w-full flex-row items-center justify-between">
            <p className="text-xl font-bold">Gynae</p>
            <Sheet sheetChild={<EditGynaeSheet />}>
              <Button className="w-20" variant="outline">
                Edit
              </Button>
            </Sheet>
          </div>
          <div className="flex w-[500px] flex-col gap-6">
            <Accordion label="Contraception" collapsable={false}>
              <div className="flex flex-col gap-8 pt-8">
                <AccordianItem
                  label="Parents"
                  chipValues={[
                    "Oral contraceptive pill",
                    "IUD",
                    "Sterilization",
                  ]}
                  isChip
                />
                <AccordianItem
                  label="Additional Notes"
                  value="Eat well and drink water well my sister"
                  isChip={false}
                />

                <AccordianItem
                  label="Pregnancies"
                  chipValues={["25 Pregnancies", "10 children"]}
                  isChip
                />
                <AccordianItem
                  label="Pregnancy Complications"
                  chipValues={["Miscarriage", "TOP"]}
                  isChip
                />
              </div>
            </Accordion>
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-xl">Gynae is only available to female patients</p>
        </div>
      )}
    </main>
  );
};

export default PatientGyaenacology;

import React, { useEffect, useState } from "react";
import SymptomSelector from "./symptomSelector";
import { ChevronRight } from "lucide-react";
import { SYMPOTOMS } from "@/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useZomujoApi from "@/services/zomujoApi";
import { useDebounce } from "@/hooks/useDebouce";
import { ISymptom } from "@/types";

const PatientSymptomSelector = ({
  title = "",
  patientTitle = "Patient Symptoms",
}) => {
  const [searchText, setSearchText] = useState("");
  const search = useDebounce(searchText, 500);
  const getSymptoms = useZomujoApi().doctors.records.getSymptoms;

  const { data, isLoading } = useQuery({
    queryKey: ["symptoms", title.split(" ")[0], search],
    refetchOnWindowFocus: false,
    queryFn: async () =>
      getSymptoms({ limit: -1, search: search, type: title.split(" ")[0] }),
  });

  const [symptoms, setSymptoms] = useState<ISymptom[]>([]);

  useEffect(() => {
    if (data) setSymptoms(data.data);
    return () => {};
  }, [data]);

  return (
    <div className="flex flex-row items-center gap-4">
      <SymptomSelector
        title={title}
        symptoms={symptoms}
        setSymptoms={setSymptoms}
        searchText={searchText}
        setSearchText={setSearchText}
        isLoading={isLoading}
      />
      <ChevronRight className="h-6 w-6 text-gray-400" />
      <SymptomSelector
        title={title}
        patient
        patientTitle={patientTitle}
        symptoms={symptoms}
        setSymptoms={setSymptoms}
      />
    </div>
  );
};

export default PatientSymptomSelector;

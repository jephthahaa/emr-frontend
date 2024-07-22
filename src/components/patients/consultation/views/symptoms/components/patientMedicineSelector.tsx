import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import MedicineSelector from "./medicineSelector";
import { useDebounce } from "@/hooks/useDebouce";
import useZomujoApi from "@/services/zomujoApi";
import { useQuery } from "@tanstack/react-query";
import { IMedicine } from "@/types";

const PatientMedicineSelector = () => {
  const [searchText, setSearchText] = useState("");
  const search = useDebounce(searchText, 500);
  const getMedicines = useZomujoApi().doctors.records.getMedicines;

  const { data, isLoading } = useQuery({
    queryKey: ["symptoms", search],
    refetchOnWindowFocus: false,
    queryFn: async () => getMedicines({ limit: 8, search: search }),
  });

  const [medicine, setMedicine] = useState<string[]>([]);

  useEffect(() => {
    if (data) setMedicine(data.data.map((item) => item.name));
    return () => {};
  }, [data]);

  return (
    <div className="flex flex-row items-center gap-4">
      <MedicineSelector
        medicine={medicine}
        setMedicine={setMedicine}
        searchText={searchText}
        setSearchText={setSearchText}
        isLoading={isLoading}
      />
      <ChevronRight className="h-6 w-6 text-gray-400" />
      <MedicineSelector patient medicine={medicine} setMedicine={setMedicine} />
    </div>
  );
};

export default PatientMedicineSelector;

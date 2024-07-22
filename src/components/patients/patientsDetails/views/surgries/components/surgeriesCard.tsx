import { PinIcon } from "@/assets/icons";
import React from "react";

const SurgeriesCard = ({ name, code }: { name: string; code?: string }) => {
  return (
    <div className="flex h-[160px] w-[180px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-sm leading-3">{name}</p>
      <div className="flex flex-row items-center justify-between">
        {code ? (
          <div className="flex items-center justify-center rounded-full bg-gray-100 p-1 px-3 text-xs capitalize leading-3">
            {code}
          </div>
        ) : (
          <div className=""></div>
        )}
        <PinIcon className="h-4 w-4 fill-primaryDark text-primaryDark" />
      </div>
    </div>
  );
};

export default SurgeriesCard;

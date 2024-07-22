import React from "react";

const CashFlowCard = () => {
  const total = 445;
  const doctors = total * 0.4;
  const patients = total * 0.6;

  return (
    <div className="flex h-[300px] w-[535px] flex-col justify-between gap-12 rounded-2xl border border-gray-100 bg-white p-8">
      <div className="flex flex-col gap-4">
        <p className="text-xl font-bold">Cash flow</p>
        <p className="text-[32px] font-bold leading-[32px]">₵ 400,463</p>
      </div>
      <div className="flex flex-1 flex-row justify-between gap-3">
        <div className="flex flex-col justify-between">
          <div
            style={{
              width: doctors,
            }}
            className="h-12 rounded-lg bg-[#FF891C]"
          ></div>
          <div className="flex flex-col justify-between">
            <p className="font-medium text-gray-500">Doctors</p>
            <div className="flex flex-row items-center gap-1.5">
              <span className="h-5 w-5 rounded-md bg-[#FF891C]"></span>
              <p className="text-2xl font-bold">14k</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div
            style={{
              width: patients,
            }}
            className="h-12 rounded-lg bg-[#2F7FFF]"
          ></div>
          <div className="flex flex-col justify-between">
            <p className="font-medium text-gray-500">Patients</p>
            <div className="flex flex-row items-center gap-1.5">
              <span className="h-5 w-5 rounded-md bg-[#2F7FFF]"></span>
              <p className="text-2xl font-bold">14k</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowCard;

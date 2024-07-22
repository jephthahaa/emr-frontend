import React from "react";

const AllUsersCard = ({ doctors = 0.4, patients = 0.6 }) => {
  const width = 534 - 12;
  const total = doctors + patients;
  const docPercentage = (doctors / total) * width;
  const patPercentage = (patients / total) * width;

  return (
    <div className="flex h-[270px] w-[600px] flex-col justify-between gap-12 rounded-2xl border border-gray-100 bg-white p-8">
      <div className="flex flex-col">
        <p className="text-xl font-bold">All Users</p>
        <p className="text-gray-500">Total users using the platform</p>
      </div>
      <div className="flex flex-1 flex-row justify-between gap-3">
        <div className="flex flex-col justify-between">
          <div
            style={{
              width: docPercentage,
            }}
            className="h-12 rounded-lg bg-[#FF891C]"
          ></div>
          <div className="flex flex-col justify-between">
            <p className="font-medium text-gray-500">Doctors</p>
            <div className="flex flex-row items-center gap-1.5">
              <span className="h-5 w-5 rounded-md bg-[#FF891C]"></span>
              <p className="text-2xl font-bold">{doctors}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div
            style={{
              width: patPercentage,
            }}
            className="h-12 rounded-lg bg-[#2F7FFF]"
          ></div>
          <div className="flex flex-col justify-between">
            <p className="font-medium text-gray-500">Patients</p>
            <div className="flex flex-row items-center gap-1.5">
              <span className="h-5 w-5 rounded-md bg-[#2F7FFF]"></span>
              <p className="text-2xl font-bold">{patients}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsersCard;

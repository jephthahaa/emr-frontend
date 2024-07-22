import React from "react";
import generalPractictionerImg from "@/assets/images/General practictioner.png";
import brainSpecialistImg from "@/assets/images/Brain Specialist.png";
import dentistImg from "@/assets/images/Dentist.png";
import Image from "next/image";

function PopularSpecialities() {
  const specialities = [
    { avatar: generalPractictionerImg, speciality: "General Practitioner" },
    {
      avatar: dentistImg,
      speciality: "Dentist",
    },
    {
      avatar: brainSpecialistImg,
      speciality: "Brain Specialist",
    },
    {
      avatar: brainSpecialistImg,
      speciality: "Brain Specialist",
    },
  ];
  return (
    <div className="w-[c alc(100vw-430px-264px-48px-16px-16px)] flex w-full flex-col gap-4">
      <h2 className="pl-6 text-xl font-bold leading-7 text-black">
        Popular Specialities
      </h2>
      <div className="flex w-full flex-row items-center gap-4 overflow-x-scroll px-6 scrollbar-none">
        {specialities.map((speciality, index) => (
          <div
            key={index}
            className="flex w-[178px] shrink-0 flex-row items-center gap-3 rounded-xl border border-gray-200 p-3"
          >
            <Image
              className="h-11 w-11"
              src={speciality.avatar}
              alt={speciality.speciality}
            />
            <p className="text-sm font-medium leading-[17px] text-black">
              {speciality.speciality}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularSpecialities;

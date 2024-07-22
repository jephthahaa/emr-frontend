"use client";
import { HotelO1, Video01Icon } from "@/assets/icons";
import { AppointmentStatus, IAppointmentVisitType } from "@/types";
import { cn, isUrl } from "@/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

type AppointmentCardProps = {
  id: string;
  className?: string;
  startDate: Date;
  endDate: Date;
  mode: IAppointmentVisitType;
  status: AppointmentStatus;
  patient?: {
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
};
const AppointmentCard = ({
  id,
  className,
  startDate,
  endDate,
  mode,
  status,
  patient,
}: AppointmentCardProps) => {
  const [showFull] = useState(false);
  const day = (startDate.getDay() + 6) % 7;

  const hour = startDate.getHours() + startDate.getMinutes() / 60;
  const duration = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60;

  const height = 60 * duration;

  return (
    <motion.div
      key={`appointment-${id}`}
      // onClick={() => setShowFull(!showFull)}
      initial={{ opacity: 0, height }}
      animate={{
        opacity: 1,
        height: showFull ? (height < 91 ? 120 : height) : height,
        padding: showFull ? 14 : height < 101 ? 10 : 14,
      }}
      exit={{ opacity: 0, height }}
      transition={{
        duration: 0.1,
      }}
      style={{
        height,
        top: 40 + hour * 60,
        left: 80 + 260 * day,
      }}
      className={cn(
        "absolute z-[8] flex w-[259px] cursor-pointer flex-col justify-between overflow-clip rounded-md border border-[#93C4F0] bg-[#E0EFFE] p-3.5 duration-150 hover:scale-[1.02]",
        height < 101 && "p-2.5",
        (
          {
            pending: "border-[#93C4F0] bg-[#E0EFFE]",
            accepted: "border-green-300 bg-green-100",
          } as any
        )[status],
        className,
      )}
    >
      <div className="flex flex-row items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold">
            {mode === "visit" ? "Visit" : "Virtual"}
          </p>
          <p className="text-xs font-medium text-gray-500">
            {format(startDate, "h aa")} - {format(endDate, "h aa")}
          </p>
        </div>
        {mode === "visit" ? <HotelO1 /> : <Video01Icon className="h-4 w-4" />}
      </div>
      {patient && (
        <div
          className={cn(
            "flex flex-row items-center gap-2",
            height < 101 && "hidden",
          )}
        >
          <div className="h-3.5 w-3.5 rounded-full bg-gray-700">
            <Image
              className="h-full w-full rounded-full"
              src={isUrl(patient.profilePicture)}
              width={14}
              height={14}
              alt="profile"
            />
          </div>
          <p className="text-xs font-bold">
            Mr {patient.firstName} {patient.lastName}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default AppointmentCard;

// return (
//   <AnimatePresence>
//     {showFull ? (
//       <motion.div
//         transition={{
//           duration: 0.3,
//         }}
//         className="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black/40 p-4 md:p-24"
//       >
//         <motion.div
//           layoutId={`appointmentCard-${id}`}
//           layout="position"
//           transition={{
//             duration: 0.3,
//           }}
//           key={`appointment-${id}-full`}
//           style={{
//             height: 120,
//           }}
//           onClick={() => setshowFull(!showFull)}
//           className={cn(
//             "z-[8] flex w-[259px] cursor-pointer flex-col justify-between overflow-clip rounded-md border border-[#93C4F0] bg-[#E0EFFE] p-3.5 duration-150 hover:scale-[1.02]",
//             (
//               {
//                 pending: "border-[#93C4F0] bg-[#E0EFFE]",
//                 accepted: "border-green-300 bg-green-100",
//               } as any
//             )[status],
//             className,
//           )}
//         >
//           <div className="flex flex-row items-start justify-between">
//             <motion.div className="flex flex-col gap-1">
//               <p className="text-sm font-bold">
//                 {mode === "visit" ? "Visit" : "Virtual"}
//               </p>
//               <p className="text-xs font-medium text-gray-500">
//                 {format(startDate, "h aa")} - {format(endDate, "h aa")}
//               </p>
//             </motion.div>
//             {mode === "visit" ? (
//               <HotelO1 />
//             ) : (
//               <Video01Icon className="h-4 w-4" />
//             )}
//           </div>
//           {patient && (
//             <div className={cn("flex flex-row items-center gap-2")}>
//               <div className="h-3.5 w-3.5 rounded-full bg-gray-700"></div>
//               <p className="text-xs font-bold">
//                 Mr {patient.firstName} {patient.lastName}
//               </p>
//             </div>
//           )}
//         </motion.div>
//       </motion.div>
//     ) : (
//       <motion.div
//         layoutId={`appointmentCard-${id}`}
//         key={`appointment-${id}`}
//         onClick={() => setshowFull(!showFull)}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{
//           duration: 0.3,
//         }}
//         style={{
//           height,
//           top: 40 + hour * 60,
//           left: 80 + 260 * day,
//         }}
//         className={cn(
//           "absolute z-[8] flex w-[259px] cursor-pointer flex-col justify-between overflow-clip rounded-md border border-[#93C4F0] bg-[#E0EFFE] p-3.5 duration-150 hover:scale-[1.02]",
//           height < 101 && "p-2.5",
//           height < 91 && "p-2",
//           (
//             {
//               pending: "border-[#93C4F0] bg-[#E0EFFE]",
//               accepted: "border-green-300 bg-green-100",
//             } as any
//           )[status],
//           className,
//         )}
//       >
//         <div className="flex flex-row items-start justify-between">
//           <div className="flex flex-col gap-1">
//             <p className="text-sm font-bold">
//               {mode === "visit" ? "Visit" : "Virtual"}
//             </p>
//             <p className="text-xs font-medium text-gray-500">
//               {format(startDate, "h aa")} - {format(endDate, "h aa")}
//             </p>
//           </div>
//           {mode === "visit" ? (
//             <HotelO1 />
//           ) : (
//             <Video01Icon className="h-4 w-4" />
//           )}
//         </div>
//         {patient && (
//           <div
//             className={cn(
//               "flex flex-row items-center gap-2",
//               height < 101 && "hidden",
//             )}
//           >
//             <div className="h-3.5 w-3.5 rounded-full bg-gray-700"></div>
//             <p className="text-xs font-bold">
//               Mr {patient.firstName} {patient.lastName}
//             </p>
//           </div>
//         )}
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

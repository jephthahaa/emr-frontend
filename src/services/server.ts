"use server";

import { auth } from "@/lib/auth";

export const getAdminInfo = async () => {
  "use action";
  const user = (await auth()).getUser();

  return {
    name: `${user?.firstName} ${user?.lastName}`,
  };
};

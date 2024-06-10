"use client";

import { redirect } from "next/navigation";

import { useCurrentRole } from "@/hooks/use-current-role";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const userRole = useCurrentRole();

  if (userRole !== "ADMIN") {
    return redirect("/");
  }

  return <div>{children}</div>;
};

export default AdminLayout;

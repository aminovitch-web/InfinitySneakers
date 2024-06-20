"use client";

import { redirect } from "next/navigation";

import { useCurrentRole } from "@/hooks/use-current-role";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const userRole = useCurrentRole();

  if (userRole !== "ADMIN") {
    return redirect("/");
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {children}
    </div>
  );
};

export default AdminLayout;

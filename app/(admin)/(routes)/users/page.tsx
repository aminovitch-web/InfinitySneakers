import { format } from "date-fns";

import UsersClient from "./_components/client";
import { db } from "@/prisma";
import { UserColumn } from "./_components/columns";

const UsersPage = async () => {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedUsers: UserColumn[] = users.map((item) => ({
    id: item.id,
    name: item.name ?? "",
    surname: item.surname ?? "",
    email: item.email ?? "",
    role: item.role ?? "",
    active: item.active ?? "",
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <UsersClient data={formattedUsers} />
      </div>
    </div>
  );
};

export default UsersPage;

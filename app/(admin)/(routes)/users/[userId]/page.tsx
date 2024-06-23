import { UserForm } from "./_components/user-form";
import { db } from "@/prisma";

const UserPage = async ({ params }: { params: { userId: string } }) => {
  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <UserForm initialData={user} />
      </div>
    </div>
  );
};

export default UserPage;

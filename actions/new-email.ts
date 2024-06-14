"use server";

import * as z from "zod";

import { db } from "@/prisma";
import { getUserByEmail } from "@/data/user";
import { NewEmailSchema } from "@/schemas";
import { getSettingsTokenByToken } from "@/data/settings-token";

export const newEmail = async (
  values: z.infer<typeof NewEmailSchema>
) => {
  const existingToken = await getSettingsTokenByToken(values.token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (existingToken.code !== values.code) {
    return { error: "Please make sure you enter your code correctly." };
  }

  await db.user.update({
    where: { id: existingUser?.id },
    data: {
      email: existingToken.email,
    },
  });

  await db.settingsToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};

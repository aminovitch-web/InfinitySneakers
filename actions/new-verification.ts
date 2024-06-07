"use server";

import * as z from "zod";

import { db } from "@/prisma";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { NewVerificationSchema } from "@/schemas";

export const newVerification = async (
  values: z.infer<typeof NewVerificationSchema>
) => {
  const existingToken = await getVerificationTokenByToken(values.token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  if (existingToken.code !== values.code) {
    return { error: "Please make sure you enter your code correctly." };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};

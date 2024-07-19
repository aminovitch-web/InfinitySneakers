"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/prisma";
import { SettingSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateSettingsToken } from "@/lib/tokens";
import { sendSettingsEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized!" };
  }
console.log(values);

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.surname = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const settingsToken = await generateSettingsToken(values.email);

    await sendSettingsEmail(
      settingsToken.email,
      settingsToken.token,
      settingsToken.code
    );

    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return { error: "Please make sure you entered your password correctly." };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings Updated!" };
};

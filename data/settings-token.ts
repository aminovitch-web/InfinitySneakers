import { db } from "@/prisma";

export const getSettingsTokenByToken = async (token: string) => {
  try {
    const settingsToken = await db.settingsToken.findUnique({
      where: { token },
    });

    return settingsToken;
  } catch {
    return null;
  }
};

export const getSettingsTokenByEmail = async (email: string) => {
  try {
    const settingsToken = await db.settingsToken.findFirst({
      where: { currentEmail: email },
    });

    return settingsToken;
  } catch {
    return null;
  }
};

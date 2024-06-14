import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/prisma";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getSettingsTokenByEmail } from "@/data/settings-token";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const code = crypto.randomInt(100_000, 1_000_000).toString();

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
      code,
    },
  });

  return verificationToken;
};

export const generateSettingsToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const code = crypto.randomInt(100_000, 1_000_000).toString();

  const existingToken = await getSettingsTokenByEmail(email);

  if (existingToken) {
    await db.settingsToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const settingsToken = await db.settingsToken.create({
    data: {
      email,
      token,
      expires,
      code,
    },
  });

  return settingsToken;
};

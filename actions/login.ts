"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { CUSTOMER_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { getVerificationTokenByEmail } from "@/data/verification-token";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser?.password) {
    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser?.password
    );
    if (!passwordsMatch) {
      return {
        error:
          "Looks like either your email address or password were incorrect. Please try again.",
      };
    }
  }

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error:
        "Looks like either your email address or password were incorrect. Please try again.",
    };
  }

  if (!existingUser.emailVerified) {
    // check if verification token exists
    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
      // if yes, check if token expired
      if (new Date(existingToken.expires) < new Date()) {
        // if yes, delete token and send new token
        const verificationToken = await generateVerificationToken(email);
        // send email
        await sendVerificationEmail(
          verificationToken.email,
          verificationToken.token,
          verificationToken.code
        );
        return {
          success: "Verification token expired. New token sent",
        };
      } else {
        // if no, send error
        return {
          error: "Please check your email to verify your account",
        };
      }
    }

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      verificationToken.code
    );

    return {
      success: "Verification email sent",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: "Successfully logged in",
    };
  } catch (error) {
    if (error instanceof AuthError)
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error:
              "Looks like either your email address or password were incorrect. Please try again.",
          };

        default:
          return { error: "Something went wrong!" };
      }

    throw error;
  }
};

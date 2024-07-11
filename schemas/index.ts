import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required!",
    }),
    surname: z.string().min(1, {
      message: "Surname is required!",
    }),
    email: z.string().email({
      message: "Email is required!",
    }),
    password: z.string().min(6, {
      message: "Minimum 6 characters required!",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum 6 characters required!",
    }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Minimum 6 characters required!",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum 6 characters required!",
    }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export const NewVerificationSchema = z.object({
  code: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
  token: z.string().min(1),
});

export const SearchSchema = z.object({
  search: z.string().min(1, {
    message: "Required!",
  }),
});

export const SettingSchema = z
  .object({
    name: z.optional(z.string()),
    surname: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(
      z.string().min(6, {
        message: "Minimum 6 characters required!",
      })
    ),
    newPassword: z.optional(
      z.string().min(6, {
        message: "Minimum 6 characters required!",
      })
    ),
  })
  .refine((data) => {
    if (data.password && !data.newPassword) return false;

    return true;
  });

export const NewEmailSchema = z.object({
  code: z.string().min(6, {
    message: "Minimum 6 characters required!",
  }),
  token: z.string().min(1),
});

export const BillboardSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().url(),
});

export const CategorySchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

export const SizeSchema = z.object({
  name: z.string().min(1),
});

export const ColorSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/, {
    message: "String must be a valid hex code",
  }),
});

export const ProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  images: z.object({ url: z.string() }).array().min(1),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizes: z.object({ label: z.string(), value: z.string() }).array().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

export const StockSchema = z.object({
  quantity: z.number(),
});

export const UserSchema = z.object({
  name: z.string().min(1),
  surname: z.optional(z.string()),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
  active: z.boolean().default(false),
});

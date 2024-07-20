import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV !== "development" ? true : false,
  },
} as SMTPTransport.Options);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_FRONTEND_URL}/reset-password?token=${token}`;

  await transport.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  code: string
) => {
  const confirmLink = `${process.env.NEXT_FRONTEND_URL}/new-verification?token=${token}`;

  await transport.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Confirm your email",
    html: `<p>Your Code: ${code}<br/>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendSettingsEmail = async (
  email: string,
  token: string,
  code: string
) => {
  const confirmLink = `${process.env.NEXT_FRONTEND_URL}/new-email?token=${token}`;

  await transport.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Confirm your email",
    html: `<p>Your Code: ${code}<br/>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

// export const sendContactEmail = async (
//   name: string,
//   email: string,
//   subject: string,
//   message: string
// ) => {
//   await transport.sendMail({
//     from: email,
//     to: process.env.MAIL_HOST,
//     subject: `Contact Form Submission: ${subject}`,
//     html: `
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Subject:</strong> ${subject}</p>
//       <p><strong>Message:</strong><br/>${message}</p>
//     `,
//   });
// };

import { NextResponse } from "next/server";

import { transport } from "@/lib/mail";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, subject, message } = body;

  try {
    await transport.sendMail({
      from: email,
      to: process.env.MAIL_USER,
      subject: `Contact Form Submission: ${subject}`,
      html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return new NextResponse("Failed to send email", { status: 500 });
  }
}

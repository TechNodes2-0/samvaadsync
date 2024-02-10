import { NextResponse } from "next/server";
import sendMail from "@/lib/actions/mail.action";

export const POST = async (req, res) => {
  try {
    await sendMail(
      "Test Email",
      "Nishitbaria@gmail.com",
      "This is a test email from the server"
    );

    return NextResponse.json("Success");
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
};

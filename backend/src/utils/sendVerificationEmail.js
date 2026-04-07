import { getVerificationEmailHTML } from "../emails/verificationEmail.jsx";
import { Resend } from "resend";

const sendVerificationEmail = async (
  email,
  username,
  verifyCode,
) => {
  const resend = new Resend(process.env.RESEND_API);
  try {
    const html = await getVerificationEmailHTML({ username, otp: verifyCode });
    await resend.emails.send({
      from: "Arogya <no-reply@verify.harshk.online>",
      to: email,
      subject: "Arogya | Verification Code",
      html,
    });
    return {
      success: true,
      message: "Verification email send successfully",
    };
  } catch (error) {
    console.log("Error while sending verification email : ", error);
    return {
      success: false,
      message: "Failed to send Verification email",
    };
  }
};

export { sendVerificationEmail };
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: Boolean(process.env.SECURE),
      auth: {
        user: "nakashika2323@gmail.com",
        pass: "rcwn aveh ozkz ptfw",
      },
      logger: true,
      debug: true,
    });

    await transporter.sendMail({
      from: "nakashika2323@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

export default sendEmail;

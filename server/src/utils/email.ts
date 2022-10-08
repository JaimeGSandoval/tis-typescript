import nodemailer from 'nodemailer';
import AppError from './app-error';

const sendEmail = async (options: any) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 0,
    auth: {
      user: process.env.EMAIL_USER, // mailtrap username
      pass: process.env.EMAIL_PASSWORD, // mailtrap password
    },
  });

  try {
    await transporter.sendMail({
      from: 'tissupport@email.com', // sender address
      to: options.email, // list of receivers
      subject: options.subject, // Subject line
      text: options.message, // plain text body
    });
  } catch (e: any) {
    throw new AppError(e.message, 500);
  }
};

export default sendEmail;

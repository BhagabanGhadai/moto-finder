import nodemailer from 'nodemailer'
import env from '../../env.js'

export const sendEmail = async (options) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.EMAIL,
        pass: env.PASSWORD
    }
});

  const mail = {
    from: env.EMAIL,
    to: options.email, 
    subject: options.subject,
    text: options.message, 
    html: options.message,
  };

  try {
   await transporter.sendMail(mail);
  } catch (error) {
    console.log(
      "Email service failed silently. Make sure you have provided your MAIL credentials in the .env file"
    );
    console.log("Error: ", error);
  }
};
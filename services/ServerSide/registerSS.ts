import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

let PIN: number;

export const sendEmails = async (name: string, email: string) => {
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken:process.env.OAUTH_ACCESS_TOKEN,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: `${email}`,
    subject: `Hello ${name}`,
    text: "ЗА НИЩО НЕ СТАВАШ",
    html: `<p>This is a test email sent with <b>${PIN}</b>!</p>`,
  };

  return await transporter.sendMail(mailOptions);
};

export const createSessionTokenSS = (email: string) => {
  PIN = Math.floor(Math.random() * 1000000);
  const token = jwt.sign({ email, PIN }, process.env.JWT_SESSION_SECRET, {
    expiresIn: process.env.JWT_SESSION_EXPIRESIN,
  });
  return token;
};

// export const createUser = async (userData: any) => {
//   connectDb();
//   const activity = await new Activity({}).save();

//   return await new User({
//     ...userData,
//     activity,
//   }).save();
// };

// export const createUser = async ({ name, email, password }:any) => {
//   connect()
//   const hashedPassword = await bcryptjs.hash(password, 10);

//   const userSchema = new User({
//     name,
//     email,
//     password: hashedPassword,
//   });

//   const createdUser = await userSchema.save();
//   return createdUser;
// };

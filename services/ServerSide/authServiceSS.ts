import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const loginSS = async (email: string, password: string) => {
  connectDb();
  const user = await User.findOne({ email });

  const hashedPassowrd = user.password;
  const isMatched = await bcrypt.compare(password, hashedPassowrd);

  if (!isMatched) {
    throw { error: "Wrong credentials" };
  } else if (!user) {
    throw { error: "Can't find user" };
  } else {
    return user;
  }
};

// export const logoutSS = (token: string) => {
// };

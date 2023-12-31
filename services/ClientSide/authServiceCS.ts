import { API } from "@/Constants";
import axios from "axios";

type LoginArgs = {
  email: string;
  password: string;
};

export const loginCS = async (userCredentials: LoginArgs) => {
  console.log(userCredentials);
  

  const user = await axios.post(`${API}/auth/login`, userCredentials);
  return user.data;
};
export const logoutCS = () => {
  localStorage.removeItem("auth");
  document.cookie =
    "loggedUser" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // const options = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  // };
  // const res = await axios.delete(`${API}/auth/logout`, options);
  // return res.data;
};

import { API } from "@/Constants";
import axios from "axios";

export const createPost = async (
  userId: string,
  content: string | undefined
) => {
  const postData = {
    user_id: userId,
    content,
  };

  const createdPost = await axios.post(`${API}/posts`, postData);
  return createdPost.data;
};

export const getAllPostsCS = async () => {
  const response = await axios.get(`${API}/posts`);
  return response.data;
};

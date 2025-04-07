import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const GetPost = () => {
  return api.get("/posts");
};

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

export const postData = async (post) => {
  try {
    const response = await api.post("/posts", post);
    console.log("API Response:", response);
    return response;
  } catch (error) {
    console.error("Error posting data:", error);
    return error.response;
  }
};

export const updateData = (id, post) => {
  return api.put(`/posts/${id}`, post);
};

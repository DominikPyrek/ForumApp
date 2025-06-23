import axiosInstance from "./axios";

type RegisterData = {
  username: string;
  password: string;
  email: string;
  bio: string;
  avatar: File;
};

type LoginData = {
  username: string;
  password: string;
};

type PostData = {
  title: string;
  preview_text: string;
  content: string;
};

type PostApiResponse = {
  count: number;
  next: null | number;
  previous: null | number;
  results: Post[];
};

type Post = {
  id: number;
  creator: Creator;
  title: string;
  preview_text: string;
  content: string;
  created_at: string;
  liked_by: [];
  like_count: number;
};

type Creator = {
  id: number;
  username: string;
  email: string;
  avatar: null;
  bio: string;
};

export function Register(data: RegisterData) {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);
  formData.append("email", data.email);
  formData.append("bio", data.bio);
  formData.append("avatar", data.avatar);

  return axiosInstance.post("/users/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function Login(data: LoginData) {
  return axiosInstance.post("/token/", data);
}

export function CreatePost(data: PostData) {
  return axiosInstance.post("/posts/", data);
}

export function GetPosts() {
  return axiosInstance.get<PostApiResponse>("/posts/list/");
}

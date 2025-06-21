import axiosInstance from "@/lib/axios";

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

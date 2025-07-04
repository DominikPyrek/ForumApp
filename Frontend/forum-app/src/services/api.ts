import axiosInstance from "./axios";
import type {
  Post,
  RegisterData,
  LoginData,
  PostData,
  PostApiResponse,
  CommentApiRespoonse,
} from "@/types";

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

export function MyPosts() {
  return axiosInstance.get<PostApiResponse>("/posts/my/");
}

export function GetPostDetails(pk: string | undefined) {
  let grabPostById = "posts/" + pk + "/";
  return axiosInstance.get<Post>(grabPostById);
}

export function GetComments(pk: string | undefined) {
  let grabCommentsByPostId = "comments/list/" + pk + "/";
  return axiosInstance.get<CommentApiRespoonse>(grabCommentsByPostId);
}

export function CreateComment(data: any) {
  return axiosInstance.post("/comments/", data);
}

export function MyComments() {
  return axiosInstance.get<CommentApiRespoonse>("comments/my/");
}

export function LikePost(pk: string | undefined) {
  return axiosInstance.post("posts/" + pk + "/like/");
}

export function LikeComment(pk: string | undefined) {
  return axiosInstance.post("comments/" + pk + "/like/");
}

export function UpdatePost(pk: string | undefined, data: PostData) {
  return axiosInstance.put("posts/" + pk + "/", data);
}

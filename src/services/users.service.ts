import { TFormInput as TSignUpData } from "@/forms/SignUp/types";
import { APIRequest } from "@/utils";
import { TDBTable, TUser } from "@/utils/types";

const URL = `users`;

export const login = async (email: string, password: string) =>
  APIRequest<{ user: TDBTable<TUser> }>(`${URL}/login`, "POST", {
    body: JSON.stringify({ email, password }),
  });

export const signUp = async (user: TSignUpData) =>
  APIRequest(`${URL}/sign-up`, "POST", {
    body: JSON.stringify(user),
  });

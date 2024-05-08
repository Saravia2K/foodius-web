import { DELIVERY_METHODS } from "./enums";

export type TAPIResponse<T> = { message: string; resData: Response } & T;

export type TDBTable<T> = { id: number } & T;

export type TUser = {
  names: string;
  last_names: string;
  email: string;
  phone_number: string;
  location: string;
  password: string;
};

export type TCreateOrderRequestBody = {
  id_user: number;
  date: Date;
  delivery_method: DELIVERY_METHODS;
};

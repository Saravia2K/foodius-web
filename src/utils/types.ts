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

import { APIRequest } from "@/utils";
import { TCreateOrderRequestBody } from "@/utils/types";

const URL = `orders`;

export const createOrder = async (order: TCreateOrderRequestBody) => {
  const { data } = await APIRequest<{ message: string; token?: string }>(
    URL,
    "POST",
    {
      body: JSON.stringify(order),
    }
  );
  return data.token;
};

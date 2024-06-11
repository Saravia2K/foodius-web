import { APIRequest } from "@/utils";

const URL = `orders`;

export const createOrder = async (id_user: number, plates: TPlate[]) => {
  const { data } = await APIRequest<{ message: string; token?: string }>(
    URL,
    "POST",
    {
      body: JSON.stringify({
        id_user,
        plates,
      }),
    }
  );
  return data.token;
};

type TPlate = {
  id_food: number;
  price: number;
  quantity: number;
};

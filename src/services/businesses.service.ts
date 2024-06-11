import { API_URL } from "@/utils/consts";
import { TBusiness, TDBTable } from "@/utils/types";

export const login = async (email: string, password: string) => {
  const fetchRes = await fetch(`${API_URL}/businesses/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (fetchRes.status == 404)
    return {
      message: "Credenciales incorrectas",
    };

  return (await fetchRes.json()) as TDBTable<TBusiness>;
};

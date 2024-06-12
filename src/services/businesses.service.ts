import { API_URL } from "@/utils/consts";
import { TBusiness, TDBTable } from "@/utils/types";

export const createBusiness = async (fd: FormData) => {
  try {
    const fetchRes = await fetch(`${API_URL}/businesses`, {
      method: "POST",
      body: fd,
    });

    const statusCode = fetchRes.status;
    const business = await fetchRes.json();
    return {
      statusCode,
      business,
    };
  } catch (error) {
    return {
      statusCode: 500,
    };
  }
};

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

export const isRegisterTokenValid = async (token: string) => {
  try {
    const fetchRes = await fetch(`${API_URL}/register-token/${token}/is-valid`);

    if (!fetchRes.ok) throw new Error();

    const data = (await fetchRes.json()) as { valid: boolean };

    return data.valid;
  } catch (error: any) {
    return false;
  }
};

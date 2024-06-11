import { API_URL } from "@/utils/consts";

export const checkLogin = async (email: string) => {
  const fetchRes = await fetch(`${API_URL}/check-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (fetchRes.ok) {
    const { login } = (await fetchRes.json()) as { login: "user" | "business" };
    return login;
  }

  const { message } = (await fetchRes.json()) as { message: "string" };
  return message;
};

export const setCookie = async (key: string, value: string) => {
  await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key, value }),
  });
};

export const removeCookie = async (key: string) => {
  await fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key }),
  });
};

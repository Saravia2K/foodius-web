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

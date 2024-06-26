import { TAPIResponse } from "./types";
import { API_URL } from "./consts";

export default async function APIRequest<T>(
  url: string,
  method: ReqMethods,
  options?: Options | {}
) {
  const fetchRes = await fetch(`${API_URL}/${url}`, {
    ...options,
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const fetchResCopy = fetchRes.clone();
  const data = (await fetchRes.json()) as TAPIResponse<T>;
  return {
    data,
    response: fetchResCopy,
  };
}

type ReqMethods = "POST" | "GET" | "PATCH" | "DELETE";

type Options = Omit<Response, "method" | "headers">;

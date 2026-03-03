type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions<TBody> = {
  method?: HttpMethod;
  body?: TBody;
  signal?: AbortSignal;
};

async function request<TResponse, TBody = unknown>(
  url: string,
  options?: RequestOptions<TBody>,
): Promise<Readonly<TResponse>> {
  const res = await fetch(url, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
    signal: options?.signal,
  });

  if (!res.ok) {
    throw new Error("Network error");
  }

  return res.json();
}

export const http = {
  get: <T>(url: string, signal?: AbortSignal) =>
    request<T>(url, { method: "GET", signal }),

  post: <TResponse, TBody>(url: string, body: TBody) =>
    request<TResponse, TBody>(url, { method: "POST", body }),

  put: <TResponse, TBody>(url: string, body: TBody) =>
    request<TResponse, TBody>(url, { method: "PUT", body }),

  delete: <TResponse>(url: string) =>
    request<TResponse>(url, { method: "DELETE" }),
};

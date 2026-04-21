import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post("/api/login", async ({ request }) => {
    const body = await request.json();

    const { username, password } = body as {
      username: string;
      password: string;
    };

    // validasi mock
    if (username === "admin" && password === "123456") {
      return HttpResponse.json(
        {
          success: true,
          message: "Login success",
          data: {
            token: "mock-jwt-token",
            user: {
              id: 1,
              username: "admin",
              role: "admin",
            },
          },
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      {
        success: false,
        message: "Invalid username or password",
      },
      { status: 401 }
    );
  }),
];
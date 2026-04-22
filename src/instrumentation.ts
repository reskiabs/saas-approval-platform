export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { server } = await import("./mocks/server");

    server.listen({
      onUnhandledRequest: "bypass",
    });
  }

  if (typeof window !== "undefined") {
    const { worker } = await import("./mocks/browser");

    await worker.start();
  }
}
import { setupServer } from "msw/node";
import { authHandlers } from "./handlers/auth.handler";
import { documentHandlers } from "./handlers/document.handler";

export const server = setupServer(
  ...authHandlers,
  ...documentHandlers
);
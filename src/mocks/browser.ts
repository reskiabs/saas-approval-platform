import { setupWorker } from "msw/browser";
import { documentHandlers } from "./handlers/document.handler";
import { authHandlers } from "./handlers/auth.handler";

export const worker = setupWorker(
  ...documentHandlers,
  ...authHandlers
);
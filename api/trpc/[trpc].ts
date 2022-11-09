import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../src/backend/router";

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

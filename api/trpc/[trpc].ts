import { createNextApiHandler } from "@trpc/server/adapters/next";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { appRouter } = require("../../src/backend/router");

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

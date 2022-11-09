import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "src/backend/router";

export const trpc = createTRPCReact<AppRouter>();

import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export interface User {
  id: number;
  name: string;
}

const userList: User[] = [
  {
    id: 1,
    name: "KATT",
  },
];

const userById = t.procedure
  .input(
    z.object({
      id: z.number(),
    })
  )
  .query((req) => {
    const input = req.input;
    const user = userList.find((it) => it.id === input.id);
    return user;
  });

const userCreate = t.procedure
  .input(
    z.object({
      name: z.string(),
    })
  )
  .mutation((req) => {
    const id = Math.floor(Math.random() * 10000);
    const user: User = {
      id,
      name: req.input.name,
    };
    userList.push(user);
    return user;
  });

export const appRouter = t.router({
  userById,
  userCreate,
});

export type AppRouter = typeof appRouter;

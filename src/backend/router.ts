import { initTRPC } from "@trpc/server";
import { z } from "zod";
import * as service from "./service";

const t = initTRPC.create();

const getTodos = t.procedure.query(() => service.getTodos());

const createTodo = t.procedure
  .input(
    z.object({
      text: z.string(),
    })
  )
  .mutation((req) => service.addTodo(req.input));

const editTodo = t.procedure
  .input(
    z.object({
      id: z.number(),
      text: z.string().optional(),
      completed: z.boolean().optional(),
    })
  )
  .mutation((req) => service.editTodo(req.input.id, req.input));

const deleteTodo = t.procedure
  .input(
    z.object({
      id: z.number(),
    })
  )
  .mutation((req) => service.deleteTodo(req.input.id));

export const appRouter = t.router({
  getTodos,
  createTodo,
  editTodo,
  deleteTodo,
});

export type AppRouter = typeof appRouter;
export type { Todo } from "@prisma/client";

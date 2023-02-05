import { initTRPC } from "@trpc/server";
import { z } from "zod";
import * as service from "./service";

const t = initTRPC.create();

const getTodos = t.procedure
  .input(
    z.object({
      authToken: z.string(),
    })
  )
  .query((req) => service.getTodos(req.input));

const createTodo = t.procedure
  .input(
    z.object({
      text: z.string(),
      authToken: z.string(),
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

const registerUser = t.procedure
  .input(
    z.object({
      username: z.string(),
      password: z.string(),
    })
  )
  .mutation((req) => service.registerUser(req.input));

const loginUser = t.procedure
  .input(
    z.object({
      username: z.string(),
      password: z.string(),
    })
  )
  .mutation((req) => service.loginUser(req.input));

export const appRouter = t.router({
  getTodos,
  createTodo,
  editTodo,
  deleteTodo,

  loginUser,
  registerUser,
});

export type AppRouter = typeof appRouter;

import { PrismaClient } from "@prisma/client";
import { Result } from "src/data/result";
import {
  Auth,
  CreateUserError as RegisterUser,
  Credentials,
  LoginError,
} from "./service/auth";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const prisma = new PrismaClient();

export type Filter = "completed" | "active";

const todoSelection = { id: true, completed: true, text: true } as const;

const auth = new Auth({
  async createUser({ username, hashedPassword }) {
    const existingUser = await prisma.user.findFirst({
      where: { username },
      select: { id: true },
    });

    if (existingUser !== null) {
      return {
        type: "error",
        error: "user_already_exists",
      };
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        hashedPassword,
      },
    });

    return { type: "ok", value: newUser };
  },

  async findUserByUsername(username) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  },
});

export type User = {
  username: string;
  authToken: string;
};

export async function registerUser(args: {
  username: string;
  password: string;
}): Promise<Result<User, RegisterUser>> {
  return auth.registerUser(args);
}

export async function loginUser(args: {
  username: string;
  password: string;
}): Promise<Result<Credentials, LoginError>> {
  return auth.loginUser(args);
}

export async function getCurrentUser(authToken: string) {
  return await auth.getAuthorizedUser(authToken);
}

export async function getTodos(args: {
  authToken: string;
  filter?: Filter;
}): Promise<Todo[]> {
  const user = await auth.getAuthorizedUser(args.authToken);

  const completedFilter = () => {
    switch (args.filter) {
      case undefined:
        return undefined;
      case "active":
        return false;
      case "completed":
        return true;
    }
  };

  return await prisma.todo.findMany({
    select: todoSelection,
    orderBy: { createdAt: "desc" },

    where: {
      userId: user.id,
      completed: completedFilter(),
    },
  });
}

export async function deleteTodo(id: number): Promise<void> {
  await prisma.todo.delete({
    // select: todoSelection,
    where: { id },
  });
}

export async function editTodo(
  id: number,
  data: Partial<{ text: string; completed: boolean }>
): Promise<Todo> {
  return await prisma.todo.update({
    select: todoSelection,
    where: { id },
    data: {
      text: data.text,
      completed: data.completed,
    },
  });
}

export async function addTodo(args: {
  text: string;
  authToken: string;
}): Promise<Todo> {
  const user = await auth.getAuthorizedUser(args.authToken);

  const newTodo = await prisma.todo.create({
    select: todoSelection,
    data: {
      text: args.text,
      completed: false,
      userId: user.id,
    },
  });

  return newTodo;
}

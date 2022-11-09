import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export type Filter = "completed" | "active";

export async function getTodos(options: { filter?: Filter } = {}) {
  const completedFilter = () => {
    switch (options.filter) {
      case undefined:
        return undefined;
      case "active":
        return false;
      case "completed":
        return true;
    }
  };

  return await prismaClient.todo.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      completed: completedFilter(),
    },
  });
}

export async function getTodo(id: number) {
  return await prismaClient.todo.findUnique({
    where: { id },
  });
}

export async function deleteTodo(id: number) {
  return await prismaClient.todo.delete({
    where: { id },
  });
}

export async function editTodo(
  id: number,
  data: Partial<{ text: string; completed: boolean }>
) {
  return await prismaClient.todo.update({
    where: { id },
    data: {
      text: data.text,
      completed: data.completed,
    },
  });
}

export async function addTodo(args: { text: string }) {
  const newTodo = await prismaClient.todo.create({
    data: {
      text: args.text,
      completed: false,
    },
  });

  return newTodo;
}

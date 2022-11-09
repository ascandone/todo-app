import { Todo } from "src/backend/router";
import type { TodoAppProps } from "./TodoApp";

type Todos = TodoAppProps["todos"];

export class OptimisticLogic {
  constructor(
    private readonly services = {
      getRandom: Math.random,
    }
  ) {}

  createTodo(todos: Todos, { text }: { text: string }): Todos {
    const randId = Math.floor(this.services.getRandom() * 1e6);
    const newTodo: Todo = {
      text,
      completed: false,
      id: randId,
      createdAt: new Date(),
    };

    return [newTodo, ...todos];
  }

  editTodo(
    todos: Todos,
    { id, text, completed }: { id: number; text?: string; completed?: boolean }
  ): Todos {
    return todos.map((thisTodo) =>
      thisTodo.id === id
        ? {
            ...thisTodo,
            text: text ?? thisTodo.text,
            completed: completed ?? thisTodo.completed,
          }
        : thisTodo
    );
  }

  deleteTodo(todos: Todos, { id }: { id: number }): Todos {
    return todos.filter((thisTodo) => thisTodo.id !== id);
  }
}

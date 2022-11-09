import { FC } from "react";
import { trpc } from "src/utils/trpc";
import { Spinner } from "src/components/Spinner";
import { TodoApp } from "src/pages/index/TodoApp";
import type { Todo } from "src/backend/router";

export const LoadingScreen: FC = () => (
  <div className="flex items-center justify-center p-16">
    <Spinner />
  </div>
);

export const ErrorScreen: FC = () => <div>Error!</div>;

export const IndexPage: FC = () => {
  const ctx = trpc.useContext();

  const todos = trpc.getTodos.useQuery();

  const createTodo = trpc.createTodo.useMutation({
    async onMutate(editedTodo) {
      await ctx.getTodos.cancel();

      const randId = Math.ceil(Math.random() * 1e6);

      const newTodo: Todo = {
        text: editedTodo.text,
        completed: false,
        id: randId,
        createdAt: new Date(),
      };

      ctx.getTodos.setData(undefined, (oldTodos) =>
        oldTodos === undefined ? undefined : [newTodo, ...oldTodos]
      );

      return { previousTodos: todos.data };
    },
    onError(_err, _editedTodo, mutateCtx) {
      if (mutateCtx) {
        ctx.getTodos.setData(undefined, mutateCtx.previousTodos);
      }
    },
    onSettled() {
      ctx.getTodos.invalidate();
    },
  });

  const editTodo = trpc.editTodo.useMutation({
    async onMutate(editedTodo) {
      await ctx.getTodos.cancel();

      ctx.getTodos.setData(undefined, (oldTodos) =>
        oldTodos === undefined
          ? undefined
          : oldTodos.map((oldTodo) =>
              oldTodo.id === editedTodo.id
                ? {
                    ...oldTodo,
                    text: editedTodo.text ?? oldTodo.text,
                    completed: editedTodo.completed ?? oldTodo.completed,
                  }
                : oldTodo
            )
      );

      return { previousTodos: todos.data };
    },
    onError(_err, _editedTodo, mutateCtx) {
      if (mutateCtx) {
        ctx.getTodos.setData(undefined, mutateCtx.previousTodos);
      }
    },
    onSettled() {
      ctx.getTodos.invalidate();
    },
  });

  const deleteTodo = trpc.deleteTodo.useMutation({
    async onMutate({ id }) {
      await ctx.getTodos.cancel();

      ctx.getTodos.setData(undefined, (oldTodos) =>
        oldTodos === undefined
          ? undefined
          : oldTodos.filter((oldTodo) => oldTodo.id !== id)
      );

      return { previousTodos: todos.data };
    },
    onError(_err, _editedTodo, mutateCtx) {
      if (mutateCtx) {
        ctx.getTodos.setData(undefined, mutateCtx.previousTodos);
      }
    },
    onSettled() {
      ctx.getTodos.invalidate();
    },
  });

  if (todos.isLoading) {
    return <LoadingScreen />;
  }

  if (todos.error) {
    return <ErrorScreen />;
  }

  return (
    <div className="p-5">
      <TodoApp
        todos={todos.data}
        createTodo={(text: string) => {
          createTodo.mutate({ text });
        }}
        editTodo={(todo: Todo, text: string) => {
          editTodo.mutate({ ...todo, text });
        }}
        toggleTodo={(todo: Todo, completed: boolean) => {
          editTodo.mutate({ ...todo, completed });
        }}
        deleteTodo={(todo: Todo) => {
          deleteTodo.mutate(todo);
        }}
      />
    </div>
  );
};

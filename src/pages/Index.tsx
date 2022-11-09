import { FC } from "react";
import { trpc } from "src/utils/trpc";
import { Spinner } from "src/components/Spinner";
import { TodoApp } from "src/pages/index/TodoApp";
import type { Todo } from "src/backend/router";
import { OptimisticLogic } from "./index/OptimisticLogic";

export const LoadingScreen: FC = () => (
  <div className="flex items-center justify-center p-16">
    <Spinner />
  </div>
);

export const ErrorScreen: FC = () => <div>Error!</div>;

const optimisticLogic = new OptimisticLogic();

export const IndexPage: FC = () => {
  const ctx = trpc.useContext();

  const todos = trpc.getTodos.useQuery();

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
  const createMutationOptions = <Args extends any>(
    logic: (oldTodos: Todo[], args: Args) => Todo[]
  ) => ({
    async onMutate(args: Args) {
      await ctx.getTodos.cancel();
      ctx.getTodos.setData(undefined, (oldTodos) =>
        oldTodos === undefined ? undefined : logic(oldTodos, args)
      );
      return { previousTodos: todos.data };
    },
    onError(
      _err: unknown,
      _editedTodo: unknown,
      mutateCtx: { previousTodos: Todo[] | undefined } | undefined
    ) {
      if (mutateCtx) {
        ctx.getTodos.setData(undefined, mutateCtx.previousTodos);
      }
    },
    onSettled() {
      ctx.getTodos.invalidate();
    },
  });

  const createTodo = trpc.createTodo.useMutation({
    ...createMutationOptions(optimisticLogic.createTodo.bind(optimisticLogic)),
    onSuccess(newTodo) {
      if (todos.data) {
        ctx.getTodos.setData(undefined, [newTodo, ...todos.data.slice(1)]);
      }
    },
  });

  const editTodo = trpc.editTodo.useMutation(
    createMutationOptions(optimisticLogic.editTodo.bind(optimisticLogic))
  );

  const deleteTodo = trpc.deleteTodo.useMutation(
    createMutationOptions(optimisticLogic.deleteTodo.bind(optimisticLogic))
  );

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
        createTodo={(text) => {
          createTodo.mutate({ text });
        }}
        editTodo={(id, text) => {
          editTodo.mutate({ id, text });
        }}
        toggleTodo={(id, completed) => {
          editTodo.mutate({ id, completed });
        }}
        deleteTodo={(id) => {
          deleteTodo.mutate({ id });
        }}
      />
    </div>
  );
};

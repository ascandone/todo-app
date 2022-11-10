import { FC } from "react";
import { trpc } from "src/utils/trpc";
import { Spinner } from "src/components/Spinner";
import { TodoApp } from "src/pages/index/TodoApp";
import { OptimisticLogic } from "./index/OptimisticLogic";
import {
  AuthCredentials,
  AuthStatus,
  useProtectedRoute,
} from "src/providers/Auth";
import { Button } from "src/components/Button";
import { Todo } from "src/backend/service";

export const LoadingScreen: FC = () => (
  <div className="flex items-center justify-center p-16">
    <Spinner />
  </div>
);

export const ErrorScreen: FC = () => <div>Error!</div>;

const optimisticLogic = new OptimisticLogic();

const AuthenticatedPage: FC<{
  auth: AuthStatus & { credentials: AuthCredentials };
}> = ({ auth }) => {
  const ctx = trpc.useContext();

  const todosArgs = {
    authToken: auth.credentials.authToken,
  };

  const todos = trpc.getTodos.useQuery(todosArgs);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
  const createMutationOptions = <Args extends any>(
    logic: (oldTodos: Todo[], args: Args) => Todo[]
  ) => ({
    async onMutate(args: Args) {
      await ctx.getTodos.cancel();
      ctx.getTodos.setData(todosArgs, (oldTodos) =>
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
        ctx.getTodos.setData(todosArgs, mutateCtx.previousTodos);
      }
    },
    onSettled() {
      ctx.getTodos.invalidate();
    },
  });

  const createTodo = trpc.createTodo.useMutation({
    ...createMutationOptions(optimisticLogic.createTodo.bind(optimisticLogic)),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess(newTodo, _virtualTodo, mutationCtx) {
      if (mutationCtx?.previousTodos) {
        ctx.getTodos.setData(todosArgs, [
          newTodo,
          ...mutationCtx.previousTodos,
        ]);
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

  // TODO properly pluralize "tasks"
  const itemsLeft = todos.data.filter((todo) => !todo.completed).length;

  return (
    <div className="p-5">
      <div className="mx-auto max-w-md pt-2">
        <div className="flex justify-between items-start">
          {/* Data */}
          <div>
            <h2 className="text-xl font-medium text-gray-800">
              Hello, {auth.credentials.username}
            </h2>
            <div className="h-2"></div>
            <p className="font-xs text-gray-500">
              You&apos;ve got {itemsLeft} tasks left{" "}
            </p>
          </div>
          <div>
            <Button variant="ghost" type="button" onClick={() => auth.logout()}>
              Logout
            </Button>
          </div>
        </div>
      </div>
      <TodoApp
        todos={todos.data}
        createTodo={(text) => {
          createTodo.mutate({ text, authToken: auth.credentials.authToken });
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

export const IndexPage = () => {
  const auth = useProtectedRoute();

  if (auth.credentials === undefined) {
    return null;
  }

  // TODO why is it not working?
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <AuthenticatedPage auth={auth} />;
};

import { FC, useState } from "react";
import { Input } from "src/components/Input";
import { Button } from "src/components/Button";
import { Todo } from "src/backend/service";
import { TodoItem } from "src/components/TodoItem";

export type TodoAppProps = {
  todos: Todo[];

  createTodo: (text: string) => void;
  editTodo: (id: Todo["id"], text: string) => void;
  toggleTodo: (id: Todo["id"], completed: boolean) => void;
  deleteTodo: (id: Todo["id"]) => void;
};

export const TodoForm: FC<{ onSubmit: (value: string) => void }> = ({
  onSubmit,
}) => {
  const [value, setValue] = useState("");

  return (
    <>
      <form
        className="flex gap-x-4"
        onSubmit={(e) => {
          e.preventDefault();
          setValue("");
          onSubmit(value);
        }}
      >
        <div className="flex-1">
          <Input
            value={value}
            onInput={setValue}
            autofocus
            placeholder="Add a todo"
            name="todo"
          />
        </div>
        <Button type="submit">Add item</Button>
      </form>
    </>
  );
};

export const TodoApp: FC<TodoAppProps> = ({
  todos,
  createTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
}) => {
  return (
    <div className="mx-auto max-w-md py-6 antialiased">
      <TodoForm onSubmit={createTodo} />
      {todos.length === 0 ? null : (
        <ul className="mt-5">
          {todos.map((todo) => (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                onToggle={(completed) => toggleTodo(todo.id, completed)}
                onEditText={(value) => editTodo(todo.id, value)}
                onDelete={() => deleteTodo(todo.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

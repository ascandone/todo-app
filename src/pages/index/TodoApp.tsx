import { FC, useState } from "react";
import { TrashButton } from "src/components/TrashButton";
import { CheckBox } from "src/components/CheckBox";
import { Input } from "src/components/Input";
import { Button } from "src/components/Button";
import { Todo } from "src/backend/service";

export type TodoAppProps = {
  todos: Todo[];

  createTodo: (text: string) => void;
  editTodo: (id: Todo["id"], text: string) => void;
  toggleTodo: (id: Todo["id"], completed: boolean) => void;
  deleteTodo: (id: Todo["id"]) => void;
};

const TodoItem: FC<{
  todo: Todo;
  onToggle: (value: boolean) => void;
  onDelete: VoidFunction;
  onEditText: (value: string) => void;
}> = ({ todo, onToggle, onDelete, onEditText }) => {
  const [draft, setDraft] = useState<undefined | string>(undefined);

  const openDraft = () => {
    if (draft === undefined) {
      setDraft(todo.text);
    }
  };

  const discardDraft = () => {
    setDraft(undefined);
  };

  const saveDraft = () => {
    if (draft !== undefined) {
      onEditText(draft);
      discardDraft();
    }
  };

  return (
    <div
      className={`
        inline-flex items-center w-full
        transition-opacity duration-200 ease-in-out hover:bg-zinc-50 
        py-2 px-4 -mx-4 rounded-md
        ${todo.completed ? "opacity-50" : ""}
        `}
    >
      <CheckBox
        ariaLabel="Toggle item"
        checked={todo.completed}
        onToggle={onToggle}
      />
      <span className="mx-4 flex-1 cursor-pointer" onClick={openDraft}>
        {draft === undefined ? (
          todo.text
        ) : (
          <input
            ref={(el) => {
              el?.focus();
            }}
            onBlur={saveDraft}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                discardDraft();
              } else if (e.key === "Enter") {
                saveDraft();
              }
            }}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            id="todo-edit-input"
            className="border-b bg-transparent focus:border-sky-200 w-full outline-none"
          />
        )}
      </span>
      <TrashButton ariaLabel="Delete the item" onClick={onDelete} />
    </div>
  );
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
        <div>
          <div className="h-5"></div>
          <ul className="text-zinc-800">
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
        </div>
      )}
    </div>
  );
};

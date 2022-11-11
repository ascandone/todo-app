import { FC, useState } from "react";
import classNames from "classnames";
import { CheckBox } from "src/components/CheckBox";
import { TrashButton } from "src/components/TrashButton";
import type { Todo } from "src/backend/service";

const LineThrough: FC<{ completed: boolean }> = ({ completed }) => (
  <div
    className={classNames(
      "h-0.5 rounded-full bg-slate-800 absolute top-1/2 mt-px left-0 -translate-y-1/2 z-10",
      "transition-all duration-150 ease-in-out",
      completed ? "w-full" : "w-0"
    )}
  ></div>
);

export const TodoItem: FC<{
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
    <div className="py-2 px-4 -mx-4 rounded-md  hover:bg-slate-50">
      <div
        className={classNames(
          "transition-opacity w-full inline-flex items-center text-zinc-800",
          todo.completed ? "delay-150 duration-500 opacity-50" : "duration-300"
        )}
      >
        <CheckBox
          ariaLabel="Toggle item"
          checked={todo.completed}
          onToggle={onToggle}
        />
        <span
          className="mx-4 flex-1 cursor-pointer inline-flex"
          onClick={openDraft}
        >
          {draft === undefined ? (
            <div className="border-b-2 border-transparent relative">
              <LineThrough completed={todo.completed} />
              {todo.text}
            </div>
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
              className="border-b-2 bg-transparent focus:border-slate-300 w-full outline-none"
            />
          )}
        </span>
        <TrashButton ariaLabel="Delete the item" onClick={onDelete} />
      </div>
    </div>
  );
};

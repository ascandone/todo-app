import { FC, useState } from "react";
import classNames from "classnames";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CheckBox } from "src/components/CheckBox";
import type { Todo } from "src/backend/service";
import { IconButton } from "src/components/IconButton";

const LineThrough: FC<{ completed: boolean }> = ({ completed }) => (
  <div
    className={classNames(
      "rounded-full bg-slate-800 absolute top-1/2 mt-px left-0 -translate-y-1/2 z-10",
      "transition-all duration-200 ease-[cubic-bezier(0.63,-0.42,0.43,1.26)]",
      completed ? "w-full h-0.5" : "w-0 h-1"
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
          ariaLabel="toggle item"
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
        <IconButton
          dark
          icon={TrashIcon}
          ariaLabel="Delete the item"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

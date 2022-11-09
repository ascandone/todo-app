import { FC, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

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
        <Input
          value={value}
          onInput={setValue}
          autofocus
          placeholder="Add a todo"
          name="todo"
        />
        <Button type="submit">Add item</Button>
      </form>
    </>
  );
};

import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TodoApp } from "./TodoApp";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

test("it should render the items", () => {
  const text = "First todo";

  render(
    <TodoApp
      todos={[
        {
          id: 0,
          text,
          completed: false,
        },
      ]}
      createTodo={noop}
      editTodo={noop}
      toggleTodo={noop}
      deleteTodo={noop}
    />
  );

  expect(screen.getByText(text)).toBeInTheDocument();
});

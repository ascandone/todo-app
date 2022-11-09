import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Counter } from "./Counter";

test("It should render", () => {
  const { container } = render(<Counter />);

  fireEvent.click(screen.getByText(/Increment/i));

  expect(container).toHaveTextContent("Count: 1");
});

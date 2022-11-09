import { test, expect, describe } from "vitest";
import { OptimisticLogic } from "./OptimisticLogic";

describe("editTodo", () => {
  test("should be a noop when no args are passed", () => {
    const logic = new OptimisticLogic();

    const createdAt = new Date();

    expect(
      logic.editTodo([{ text: "abc", id: 0, completed: false, createdAt }], {
        id: 0,
      })
    ).toEqual([{ text: "abc", id: 0, completed: false, createdAt }]);
  });

  test("should be able to change the completed field", () => {
    const logic = new OptimisticLogic();

    const createdAt = new Date();

    expect(
      logic.editTodo([{ text: "abc", id: 0, completed: false, createdAt }], {
        id: 0,
        completed: true,
      })
    ).toEqual([{ text: "abc", id: 0, completed: true, createdAt }]);
  });
});

describe("deleteTodo", () => {
  test("should remove the element when present", () => {
    const logic = new OptimisticLogic();

    expect(
      logic.deleteTodo(
        [{ text: "abc", id: 0, completed: false, createdAt: new Date() }],
        { id: 0 }
      )
    ).toEqual([]);
  });
});

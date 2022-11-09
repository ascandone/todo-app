import { StoryFn, Meta } from "@storybook/react";
import { FC, useState } from "react";
import { TodoApp as Component, TodoAppProps } from "./TodoApp";
import { OptimisticLogic } from "./OptimisticLogic";

export default {
  title: "Organism/TodoApp",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;
Template.args = {
  todos: [],
  createTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
};

export const Empty = Template.bind({});
Empty.args = { todos: [] };

export const NotEmpty = Template.bind({
  todos: [
    { id: 0, text: "First todo", completed: false },
    { id: 1, text: "Second todo", completed: true },
  ],
});
NotEmpty.args = {
  todos: [
    { id: 0, text: "First todo", completed: false, createdAt: new Date() },
    { id: 1, text: "Second todo", completed: true, createdAt: new Date() },
  ],
};

const logic = new OptimisticLogic();

const AnimatedTodoApp: FC = () => {
  const [todos, setTodos] = useState<TodoAppProps["todos"]>([]);

  const createTodo: TodoAppProps["createTodo"] = (text) => {
    setTodos(logic.createTodo(todos, { text }));
  };

  const deleteTodo: TodoAppProps["deleteTodo"] = (id) => {
    setTodos(logic.deleteTodo(todos, { id }));
  };

  const toggleTodo: TodoAppProps["toggleTodo"] = (id, completed) => {
    setTodos(logic.editTodo(todos, { id, completed }));
  };

  const editTodo: TodoAppProps["editTodo"] = (id, text) => {
    setTodos(logic.editTodo(todos, { id, text }));
  };

  return (
    <Component
      todos={todos}
      createTodo={createTodo}
      deleteTodo={deleteTodo}
      toggleTodo={toggleTodo}
      editTodo={editTodo}
    />
  );
};

export const AnimatedTemplate: StoryFn<typeof Component> = () => (
  <AnimatedTodoApp />
);

import { StoryFn, Meta } from "@storybook/react";
import { TodoApp as Component } from "./TodoApp";

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
    { id: 0, text: "First todo", completed: false },
    { id: 1, text: "Second todo", completed: true },
  ],
};

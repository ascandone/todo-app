import { StoryFn, Meta } from "@storybook/react";
import { Button as Component } from "./Button";

export default {
  title: "Component/Button",
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => (
  <Component {...args}>Click me</Component>
);

export const Default = Template.bind({});
Default.args = {};

import { StoryFn, Meta } from "@storybook/react";
import { CheckBox as Component } from "./CheckBox";

export default {
  title: "Component/CheckBox",
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => (
  <Component {...args}>Click me</Component>
);

export const Unchecked = Template.bind({});
Unchecked.args = { checked: false };

export const Checked = Template.bind({});
Checked.args = { checked: true };

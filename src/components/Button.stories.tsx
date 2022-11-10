import { StoryFn, Meta } from "@storybook/react";
import { Button as Component } from "./Button";

export default {
  title: "Component/Button",
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => (
  <Component {...args}>Click me</Component>
);

export const Primary = Template.bind({});
Primary.args = { variant: "primary", disabled: false };

export const Ghost = Template.bind({});
Ghost.args = { variant: "ghost", disabled: false };

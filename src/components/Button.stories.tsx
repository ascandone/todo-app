import { StoryFn, Meta } from "@storybook/react";
import { Button as Component, ButtonProps } from "./Button";

export default {
  title: "Component/Button",
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

const defaultArgs: ButtonProps = {
  type: "button",
  onClick() {},
  loading: false,
  disabled: false,
  fullWidth: false,
  children: "Click me",
};

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
  variant: "primary",
};

export const Ghost = Template.bind({});
Ghost.args = {
  ...defaultArgs,
  variant: "ghost",
};

import { StoryFn, Meta } from "@storybook/react";
import { Alert as Component, AlertProps } from "./Alert";

export default {
  title: "Component/Alert",
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

const defaultArgs: AlertProps = { children: "Alert content" };

export const Default = Template.bind({});
Default.args = {
  onDelete() {},
  ...defaultArgs,
};

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  onDelete() {},
  type: "error",
};

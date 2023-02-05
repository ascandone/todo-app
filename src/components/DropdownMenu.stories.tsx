import { StoryFn, Meta } from "@storybook/react";
import { DropdownMenu as Component } from "./DropdownMenu";

export default {
  title: "Component/DropdownMenu",
  component: Component,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => (
  <Component {...args}>
    <p style={{ height: "12rem" }}>Example content</p>
  </Component>
);

export const Default = Template.bind({});
Default.args = {};

import { TrashIcon } from "@heroicons/react/24/outline";
import { StoryFn, Meta } from "@storybook/react";
import { IconButton as Component } from "./IconButton";

export default {
  title: "Component/TrashButton",
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick() {},
  icon: TrashIcon,
};

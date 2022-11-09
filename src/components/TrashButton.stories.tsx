import { StoryFn, Meta } from "@storybook/react";
import { TrashButton as Component } from "./TrashButton";

export default {
  title: "Component/TrashButton",
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});

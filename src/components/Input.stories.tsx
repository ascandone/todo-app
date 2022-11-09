import { StoryFn, Meta } from "@storybook/react";
import { Input as Component } from "./Input";

export default {
  title: "Component/Input",
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = { placeholder: "Placeholder" };

export const Labeled = Template.bind({});
Labeled.args = { placeholder: "Placeholder", label: "Label example" };

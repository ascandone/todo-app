import { StoryFn, Meta } from "@storybook/react";
import { RegisterPageUi as Component } from "./Register";

export default {
  title: "Page/Register",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = { registerState: { type: "idle" } };

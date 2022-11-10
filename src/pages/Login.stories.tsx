import { StoryFn, Meta } from "@storybook/react";
import { LoginPageUi as Component } from "./Login";

export default {
  title: "Page/Login",
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = { loginState: { type: "idle" } };

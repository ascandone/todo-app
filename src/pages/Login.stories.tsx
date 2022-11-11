import { StoryFn, Meta } from "@storybook/react";
import { FC, useState } from "react";
import { LoginPageUi as Component } from "./Login";
import { LoginState } from "./login/Form";

export default {
  title: "Page/Login",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = { loginState: { type: "idle" } };

const AnimatedUi: FC = () => {
  const [loading, setLoading] = useState(false);

  const loginState: LoginState = loading
    ? { type: "submitting" }
    : { type: "idle" };

  return (
    <Component
      loginState={loginState}
      onSubmit={() => {
        setLoading(true);
      }}
    />
  );
};

export const Animated: StoryFn<typeof Component> = () => <AnimatedUi />;

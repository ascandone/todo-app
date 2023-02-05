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

export const Error = Template.bind({});
Error.args = {
  loginState: {
    type: "error",
    message: "Invalid password",
  },
};

const AnimatedUi: FC = () => {
  const [loginState, setLoginState] = useState<LoginState>({ type: "idle" });

  return (
    <Component
      loginState={loginState}
      onSubmit={() => {
        setLoginState({ type: "submitting" });
        setTimeout(() => {
          setLoginState({ type: "error", message: "Invalid credentials" });
        }, 1000);
      }}
    />
  );
};

export const Animated: StoryFn<typeof Component> = () => <AnimatedUi />;

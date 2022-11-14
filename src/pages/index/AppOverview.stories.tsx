import { StoryFn, Meta } from "@storybook/react";
import { AppOverview as Component } from "./AppOverview";

export default {
  title: "Organism/AppOverview",
  component: Component,
} as Meta<typeof Component>;

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {
  itemsLeft: 2,
  auth: {
    credentials: {
      username: "ascandone",
      authToken: "TOKEN",
    },
    login() {},
    logout() {},
  },
};

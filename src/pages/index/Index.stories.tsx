import { StoryFn, Meta } from "@storybook/react";
import { IndexPage } from "../Index";

export default {
  title: "Page/Index",
  component: IndexPage,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof IndexPage>;

const Template: StoryFn<typeof IndexPage> = (args) => <IndexPage {...args} />;

export const Default = Template.bind({});
Default.args = {};

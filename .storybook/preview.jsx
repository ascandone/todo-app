import "../src/index.css";
import { Routes, Route, MemoryRouter } from "react-router-dom";

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </MemoryRouter>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "white",
    values: [
      {
        name: "white",
        value: "#ffffff",
      },
    ],
  },
};

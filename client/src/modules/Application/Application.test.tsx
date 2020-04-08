import React from "react";
import { render } from "@testing-library/react";
import Application from "./Application";

test("renders Cartuna text", () => {
  const { getByText } = render(<Application />);
  const cartunaElement = getByText(/Cartuna/i);
  expect(cartunaElement).toBeInTheDocument();
});

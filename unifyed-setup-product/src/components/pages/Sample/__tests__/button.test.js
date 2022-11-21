import { cleanup, fireEvent, render } from "@testing-library/react";

import SampleButton from "components/pages/Sample/SampleButton";

//unmount cleanup after every test
afterEach(cleanup);

it("Text in state is changed when button clicked", () => {
  const { getByText } = render(<SampleButton />);

  expect(getByText(/Initial/i).textContent).toBe("Initial State");

  fireEvent.click(getByText("State Change Button"));

  expect(getByText(/Initial/i).textContent).toBe("Initial State Changed");
});

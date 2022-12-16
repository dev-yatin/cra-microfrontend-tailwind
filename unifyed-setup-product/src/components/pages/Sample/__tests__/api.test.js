import { cleanup, render, waitFor } from "@testing-library/react";
import axiosMock from "axios";
import SampleApi from "components/pages/Sample/SampleApi";
afterEach(cleanup);

describe("axios calls", () => {
  beforeEach(() => {
    console.log("Running before test");
  });

  it("Async axios request works", async () => {
    axiosMock.get.mockResolvedValue({ data: { title: "some title" } });

    const url = "https://jsonplaceholder.typicode.com/posts/1";

    const { getByText, getByTestId } = render(<SampleApi url={url} />);
    expect(getByText(/...Loading/i).textContent).toBe("...Loading");

    const resolvedEl = await waitFor(() => getByTestId("title"));
    expect(resolvedEl.textContent).toBe("some title");

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(url);
  });
});

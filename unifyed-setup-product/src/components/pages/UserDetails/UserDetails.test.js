/**
    Test case for userdetails UI Elements and Header Count
*/

import { render, screen } from "@testing-library/react";
import UserDetails from "./UserDetails";
test("Check the UI Elements", () => {
  let userDetail = render(<UserDetails />);
  const thElements = screen.getAllByRole("rowgroup");
  const comboBoxRole = screen.getAllByRole("combobox");
  const serachTxt = screen.getByRole("textbox", {
    name: /Search/i,
  });
  const roleTxt = screen.getByRole("combobox", {
    name: /Role/i,
  });
  const filterButtontext = screen.getByRole("button", {
    name: /Filter Column/i,
  });
  expect(roleTxt).toBeInTheDocument();
  expect(serachTxt).toBeInTheDocument();
  expect(filterButtontext).toBeInTheDocument();
  expect(thElements).toHaveLength(2);
  expect(comboBoxRole).toHaveLength(2);
});
test("Count total headers", () => {
  let userDetail = render(<UserDetails />);

  const columnHeaderCount = screen.getAllByRole("columnheader", {
    name: "Toggle SortBy",
  });
  expect(columnHeaderCount).toHaveLength(5);
});

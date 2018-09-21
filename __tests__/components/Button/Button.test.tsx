import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import Button from "../../../src/components/Button/Button";

afterEach(cleanup);

test("<Button> renders", () => {
  const { container } = render(
    <MemoryRouter>
      <Button />
    </MemoryRouter>
  );
  expect(container).toBeTruthy();
});

test("<Button> has proper text", () => {
  const { container, rerender } = render(
    <MemoryRouter>
      <Button>text here</Button>
    </MemoryRouter>
  );
  expect(container.innerHTML).toMatch("text here");

  // Change up text just to be certain
  rerender(
    <MemoryRouter>
      <Button>Different text here</Button>
    </MemoryRouter>
  );
  expect(container.innerHTML).toMatch("Different text here");
});

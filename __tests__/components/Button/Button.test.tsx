import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Button from "../../../src/components/Button/Button";

function renderWithRouter(
  ui: React.ReactElement<any>,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}

afterEach(cleanup);

test("<Button /> renders", () => {
  renderWithRouter(<Button text="test" />);
});

test("<Button /> has proper text", () => {
  const { container, debug } = renderWithRouter(
    <Button text="test">text here</Button>
  );
  debug();
  expect(container.innerHTML).toMatch("test");
});

import * as React from "react";
import { render, cleanup } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import Card from "../../../src/components/Card/Card";

afterEach(cleanup);

test("<Card> renders", () => {
  const { container } = render(
    <MemoryRouter>
      <Card title="#" description="#" anchorLink="#" />
    </MemoryRouter>
  );
  expect(container).toBeTruthy();
});

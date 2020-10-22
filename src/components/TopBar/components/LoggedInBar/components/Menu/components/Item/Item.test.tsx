import * as React from "react";
import * as enzyme from "enzyme";

import Item, { ItemProps } from "./Item";
import {
  casual,
  ITERATION_SIZE
} from "../../../../../../../../utils/testUtils/testUtils";

const fakeItem = (): ItemProps => ({
  to: casual.random_element([undefined, casual.url]),
  children: casual.string,
  onClick: jest.fn()
});

const mockItems = new Array(ITERATION_SIZE).fill(null).map(fakeItem);

describe("<Item />", () => {
  it("renders", () => {
    mockItems.forEach(mockItem => {
      const wrapper = enzyme.shallow(
        <Item {...mockItem}>{mockItem.children}</Item>
      );

      expect(wrapper).toBeTruthy();
    });
  });
});

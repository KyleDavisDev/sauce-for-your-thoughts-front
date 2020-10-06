import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import TypesOfSauces from "./TypesOfSauces";
import {
  fakeStore,
  ITERATION_SIZE
} from "../../../../utils/testUtils/testUtils";
import { AppState } from "../../../../redux/configureStore";
import { ListProps } from "../../../List/List";

const mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

describe("<Types />", () => {
  it("renders", () => {
    mockStores.forEach(mockStore => {
      const wrapper = enzyme.shallow(
        <Provider store={mockStore}>
          <TypesOfSauces />
        </Provider>
      );
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockStores.forEach(mockStore => {
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <TypesOfSauces />
        </Provider>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("passes items to List", () => {
    mockStores.forEach(mockStore => {
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <TypesOfSauces />
        </Provider>
      );

      // grab prop items
      const items: ListProps[] | undefined = wrapper
        .find("List")
        .first()
        .prop("items");

      expect(items?.length).toBeGreaterThan(0);
    });
  });

  it("passes correct number of items to List", () => {
    mockStores.forEach(mockStore => {
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <TypesOfSauces />
        </Provider>
      );

      // grab prop items
      const items: ListProps[] | undefined = wrapper
        .find("List")
        .first()
        .prop("items");

      // grab types from redux
      const reduxState = mockStore.getState() as AppState;
      const reduxTypes = reduxState.sauces.types;

      // compare
      expect(items?.length).toEqual(reduxTypes.length);
    });
  });
});

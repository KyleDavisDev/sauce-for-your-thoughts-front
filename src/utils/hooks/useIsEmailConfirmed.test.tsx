import * as React from "react";
import * as enzyme from "enzyme";

import { FlashMessageProps } from "../../components/FlashMessage/FlashMessage";
import { AppState } from "../../redux/configureStore";
import { useIsEmailConfirmed } from "../../utils/hooks/useIsEmailConfirmed";
import { MockStoreEnhanced } from "redux-mock-store";
import { fakeStore, ITERATION_SIZE } from "../testUtils/testUtils";
import { Provider } from "react-redux";

const HookWrapper = props => {
  const hook = props.hook ? props.hook() : undefined;
  return <div data-hook={hook} />;
};

describe("useIsEmailConfirmed", () => {
  // May need to refer to these later so initializing out here
  let wrappers: enzyme.ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >[] = [];
  let mockStores: MockStoreEnhanced<unknown, {}>[] = [];

  beforeAll(() => {
    // add our mock stores
    mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

    // add our mounts
    wrappers = new Array(ITERATION_SIZE).fill(null).map((x, ind) => {
      return enzyme.shallow(
        <Provider store={mockStores[ind]}>
          <HookWrapper data-hook={() => useIsEmailConfirmed()} />
        </Provider>
      );
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});

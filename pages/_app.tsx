import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import Page from "../src/components/Page/Page";
import withReduxStore from "../src/redux/with-redux-store";
import Auth from "../src/utils/Auth/Auth";
import { getPersonFromStorage } from "../src/redux/users/actions";

class MyApp extends App<any, any> {
  constructor(props) {
    super(props);
    // Check if we need to update our store with localStorage info
    if (Auth.isUserAuthenticated()) {
      this.props.reduxStore.dispatch(getPersonFromStorage());
    }
  }
  public render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);

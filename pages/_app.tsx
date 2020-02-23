import App from "next/app";
import React from "react";
import Page from "../src/components/Page/Page";
import withReduxStore from "../src/redux/with-redux-store";
import { Provider } from "react-redux";

class MyApp extends App<any, any> {
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

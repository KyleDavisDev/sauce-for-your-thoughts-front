import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import Page from "../src/components/Page/Page";
import withReduxStore from "../src/redux/with-redux-store";
import Auth from "../src/utils/Auth/Auth";
import { userLoggedIn } from "../src/redux/users/actions";
import "react-image-crop/dist/ReactCrop.css";
import { API } from "../src/utils/api/API";

class MyApp extends App<any, any> {
  constructor(props) {
    super(props);
  }

  public async componentDidMount() {
    // 1) Update API token
    const res = await API.user.refreshAPIToken();

    // 2) If no problems, get user info
    if (res.data.isGood) {
      // 2.1) Get info about user
      const getInfo: any = await API.user.getInfo();

      // 2.2) Dispatch the login action to populate redux store
      this.props.reduxStore.dispatch(
        userLoggedIn({ token: res.data.token, ...getInfo })
      );
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

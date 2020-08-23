import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import "react-image-crop/dist/ReactCrop.css";

import Page from "../src/components/Page/Page";
import withReduxStore from "../src/redux/with-redux-store";
import { userLoggedIn } from "../src/redux/users/actions";
import { API } from "../src/utils/api/API";
import { UserInfo } from "../src/utils/api/types";

class MyApp extends App<any, any> {
  constructor(props) {
    super(props);
  }

  public async componentDidMount() {
    // 1) Check if we have refresh token
    const hasRefreshToken = this.getCookie("has-refresh-token");

    if (hasRefreshToken === "1") {
      try {
        // 1.1) Update API token
        const res: any = await API.user.refreshAPIToken();

        // 1.2) If no problems, get user info
        if (res?.data?.isGood) {
          // 1.2.1) Get info about user
          const getInfo: UserInfo | void = await API.user.getInfo();
          if (!getInfo) {
            return;
          }

          // 1.2.2) Dispatch the login action to populate redux store
          this.props.reduxStore.dispatch(
            userLoggedIn({ token: res.data.token, ...getInfo })
          );
        } else {
          // 1.3) Logout
          await API.user.logout();
        }
      } catch (err) {
        return;
      }
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

  // Grab a cookie' value by cookie name
  public getCookie(cookieName: string): string | null {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }
}

export default withReduxStore(MyApp);

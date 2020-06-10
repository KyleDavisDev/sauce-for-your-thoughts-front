import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import Page from "../src/components/Page/Page";
import withReduxStore from "../src/redux/with-redux-store";
import Auth from "../src/utils/Auth/Auth";
import { userLoggedIn } from "../src/redux/users/actions";
import { typesAdded } from "../src/redux/sauces/actions";
import "react-image-crop/dist/ReactCrop.css";
import { API } from "../src/utils/api/API";

class MyApp extends App<any, any> {
  constructor(props) {
    super(props);
  }

  public async componentDidMount() {
    // 1) Check if we have refresh token
    const hasRefreshToken = this.getCookie("has-refresh-token");
    if (hasRefreshToken === "1") {
      // 1.1) Update API token
      const res = await API.user.refreshAPIToken().catch(err => err);

      // 1.2) If no problems, get user info
      if (res?.data?.isGood) {
        // 1.2.1) Get info about user
        const getInfo: any = await API.user.getInfo();

        // 1.2.2) Dispatch the login action to populate redux store
        this.props.reduxStore.dispatch(
          userLoggedIn({ token: res.data.token, ...getInfo })
        );
      } else {
        // 1.3) Logout
        await API.user.logout();
      }
    }

    // 2) Grab types of sauces
    const types = await API.types.getTypes();
    if (types instanceof Array && types.length > 0) {
      // 2.1) Add "All" option to first
      types.unshift("All");

      // 2.2) Dispatch types add event to populate redux store
      this.props.reduxStore.dispatch(typesAdded(types));
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

  // Grab a cookie by name
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

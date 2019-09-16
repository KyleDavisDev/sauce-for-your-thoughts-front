import * as React from "react";
import { connect } from "react-redux";
import Article from "../../../components/Article/Article";
import Navigation from "../../../components/Navigation/Navigation";
import TopBar from "../../../components/TopBar/TopBar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { AppState } from "../../../redux/configureStore";
import Footer from "../../../components/Footer/Footer";
import Auth from "../../../utils/Auth/Auth";
import { API } from "../../../utils/api/API";

export interface IApproveSubmissionsProps {
  history: { replace: (location: string) => void };
  location: { pathname: string; search: string };
}

class ApproveSubmissions extends React.Component<IApproveSubmissionsProps> {
  public async componentDidMount() {
    // Grab token
    const token = Auth.getToken();
    if (!token || token.length === 0) {
      // Redirect user to login w/ appropriate return address
      this.props.history.replace(
        `/account/login?return=${this.props.location.pathname}${this.props.location.search}`
      );
      return;
    }

    // Get sauces
    const data = { user: { token } };
    const res = await API.admin.getUnapproved({ data });
    console.log(res);
  }

  public render() {
    return (
      <div>
        <TopBar />
        <Navigation />
        <Article>
          <PageTitle>Approve Sauces</PageTitle>
        </Article>
        <Footer />
      </div>
    );
  }
}

const mapState2Props = (state: AppState) => {
  return {};
};

export default connect(mapState2Props)(ApproveSubmissions);

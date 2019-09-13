import * as React from "react";
import { connect } from "react-redux";
import Article from "../../../components/Article/Article";
import Navigation from "../../../components/Navigation/Navigation";
import TopBar from "../../../components/TopBar/TopBar";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { AppState } from "../../../redux/configureStore";
import Footer from "../../../components/Footer/Footer";

export interface IApproveSubmissionsProps {}

class ApproveSubmissions extends React.Component<IApproveSubmissionsProps> {
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

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
import Utils from "../../../utils/Utils/Utils";
import styled from "../../../theme/styled-components";
import { Button } from "../../../components/Button/Button";

export interface IApproveSubmissionsProps {
  history: { replace: (location: string) => void };
  location: { pathname: string; search: string };
}
export interface IApproveSubmissionsState {
  sauces?: SaucesFromAPI[];
}

interface SaucesFromAPI {
  SHU: string;
  city: string;
  country: string;
  created: number;
  description: string;
  displayName: string;
  ingredients: string;
  maker: string;
  name: string;
  photo: string;
  sauceID: number;
  slug: string;
  state: string;
  types: string;
}

const StyledSauceContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1em;
  margin-bottom: 2em;
  background-color: white;
`;

const StyledImageHolder = styled.div`
  max-width: 20%;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;

  img {
    max-width: 100%;
    width: 100%;
  }
`;

const StyledSauceContent = styled.div`
  width: 80%;
  padding: 15px;
  box-sizing: border-box;
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

class ApproveSubmissions extends React.Component<
  IApproveSubmissionsProps,
  IApproveSubmissionsState
> {
  constructor(props: IApproveSubmissionsProps) {
    super(props);

    this.state = {};
  }
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

    try {
      // Get sauces
      const data = { user: { token } };
      const res = await API.admin.getUnapproved({ data });
      const sauces: [SaucesFromAPI] = Utils.toCamel(res.data.sauces);
      this.setState({ sauces });
    } catch (err) {}
  }

  public render() {
    return (
      <div>
        <TopBar />
        <Navigation />
        <Article>
          <PageTitle>Approve Sauces</PageTitle>
          {this.state.sauces &&
            this.state.sauces.map(sauce => {
              return (
                <StyledSauceContainer key={sauce.sauceID}>
                  <StyledImageHolder>
                    {sauce && sauce.photo ? (
                      <img src={`${sauce.photo}`} />
                    ) : (
                      <img src="https://res.cloudinary.com/sfyt/image/upload/v1565275178/sauces/ra1o7bsr9v2eurosoo5y.png" />
                    )}
                  </StyledImageHolder>
                  <StyledSauceContent>
                    <p>
                      <i>Name: </i>
                      {sauce.name}
                    </p>
                    <p>
                      <i>Maker: </i>
                      {sauce.maker}
                    </p>
                    <p>
                      <i>Description: </i>
                      {sauce.description}
                    </p>
                    <p>
                      <i>Types: </i>
                      {sauce.types}
                    </p>
                    <p>
                      <i>Ingredients: </i>
                      {sauce.ingredients}
                    </p>
                    <p>
                      <i>SHU: </i>
                      {sauce.SHU}
                    </p>
                    <p>
                      <i>Location: </i>
                      {sauce.country + ", " + sauce.state + ", " + sauce.city}
                    </p>
                    <p>
                      <i>Submitted By: </i>
                      {sauce.displayName}
                    </p>
                  </StyledSauceContent>
                  <StyledButtonContainer>
                    <Button
                      onClick={this.onApproveClick.bind(this, sauce.sauceID)}
                    >
                      Approve
                    </Button>
                  </StyledButtonContainer>
                </StyledSauceContainer>
              );
            })}
        </Article>
        <Footer />
      </div>
    );
  }
  private async onApproveClick(sauceID: number) {
    const token = Auth.getToken();
    if (!token || token.length === 0) {
      // Redirect user to login w/ appropriate return address
      this.props.history.replace(
        `/account/login?return=${this.props.location.pathname}${this.props.location.search}`
      );
      return;
    }
    const data = { user: { token }, sauce: { sauceID } };
    const res = await API.admin.approveSauce({ data });
    if (res.data.isGood) {
      if (this.state.sauces && this.state.sauces.length > 0) {
        const sauces = this.state.sauces.filter(sauce => {
          return sauce.sauceID !== sauceID;
        });
        // remove item from state
        this.setState({
          sauces
        });
      }
    }
  }
}

const mapState2Props = (state: AppState) => {
  return {};
};

export default connect(mapState2Props)(ApproveSubmissions);

import * as React from "react";
import { connect } from "react-redux";
import shortid from "shortid";

import { AppState, MyThunkDispatch } from "../../../../redux/configureStore";
// import { UpdateAvatar, logout } from "../../../../redux/users/actions";
import LogoSFYT from "../../../../images/icons/LogoSFYT";
import ArrowLeft from "../../../../images/icons/ArrowLeft";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import { Link } from "../../../../components/Link/Link";
import { Button } from "../../../../components/Button/Button";
import {
  StyledDiv,
  StyledLogoContainer,
  StyledArticle,
  StyledFormContainer,
  StyledButtonHolder,
  StyledRadioButton,
  StyledAvatarImg
} from "./UpdateAvatarStyle";
import {
  FlashMessage,
  FlashMessageProps
} from "../../../../components/FlashMessage/FlashMessage";
import { IUserUpdateAvatar } from "../../../../redux/users/types";
import Auth from "../../../../utils/Auth/Auth";
import { API } from "../../../../utils/api/API";
import { TextInput } from "../../../../components/TextInput/TextInput";

export interface UpdateAvatarProps {
  history: { push: (location: string) => null };
  user: { token: string; displayName: string };
  UpdateAvatar: ({ data }: { data: IUserUpdateAvatar }) => Promise<null>;
  logout: () => null;
}

export interface UpdateAvatarState {
  urls: Array<{ key: string; path: string }>;
  password: string;
  flashMessage: FlashMessageProps;
  selected: string;
}

class UpdateAvatar extends React.Component<
  UpdateAvatarProps,
  UpdateAvatarState
> {
  constructor(props: UpdateAvatarProps) {
    super(props);

    // Init state
    this.state = {
      urls: [],
      selected: "",
      password: "",
      flashMessage: {
        isVisible: false
      }
    };
  }

  public async componentDidMount() {
    // Get token or else redirect
    const token = Auth.getToken();
    if (!token) {
      this.props.history.push("/account/login?return=/account/settings/email");
      return;
    }

    const strings: string[] = await API.image
      .getAvatarURLs({ user: { token } })
      .then(res => {
        return res.data.urls;
      })
      .catch(err => console.log(err));

    const urls = strings.map((str: string) => {
      return { key: shortid.generate(), path: str };
    });

    // console.log(urls);
    this.setState({ ...this.state, urls });
  }

  public render() {
    const { urls } = this.state;

    return (
      <StyledDiv>
        <StyledLogoContainer>
          <Link to="/">
            <LogoSFYT />
          </Link>
        </StyledLogoContainer>
        <hr />
        <StyledArticle>
          <PageTitle>Update Avatar</PageTitle>
          <StyledFormContainer>
            {this.state.flashMessage.isVisible && (
              <FlashMessage {...this.state.flashMessage}>
                {this.state.flashMessage.text}
              </FlashMessage>
            )}
            <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
              {urls.map(url => {
                return (
                  <StyledRadioButton
                    label={this.avatarImage(url.path)}
                    checked={url.key === this.state.selected}
                    id={url.key}
                    name={"Avatar"}
                    key={url.key}
                    value={url.key}
                    onClick={this.onRadioClick}
                  />
                );
              })}
              <br />
              <br />
              <TextInput
                type="password"
                onChange={this.onTextChange}
                disabled={false}
                showLabel={true}
                label={"Password"}
                name={"password"}
                value={this.state.password}
                required={true}
              />
              <StyledButtonHolder>
                <Link to="/account/settings">
                  <Button type="button" displayType="outline">
                    <ArrowLeft /> Settings
                  </Button>
                </Link>
                <Button type="submit">Update!</Button>
              </StyledButtonHolder>
            </form>

            {this.authorContribution()}
          </StyledFormContainer>
        </StyledArticle>
      </StyledDiv>
    );
  }

  private onSubmit = async (event: React.FormEvent): Promise<any> => {
    // Prevent normal form submission
    event.preventDefault();

    // Grab variables
    const { selected, password } = this.state;

    // Get the avatar with the slected key
    const avatar = this.state.urls.find(val => val.key === selected);

    if (!avatar) {
      this.setState({
        flashMessage: {
          isVisible: true,
          text: "You must select an avatar in order to update.",
          type: "warning"
        }
      });
      window.scrollTo(0, 0); // Move screen to top
      return;
    }

    // Grab the actual path
    const avatarURL = avatar.path;

    // Confirm password is longer than 8 characters
    if (password.length < 8) {
      this.setState({
        flashMessage: {
          isVisible: true,
          text:
            "Your password is too short! Password length must be at least 8 characters.",
          type: "warning"
        }
      });
      window.scrollTo(0, 0); // Move screen to top
      return;
    }

    // Get token or else redirect
    const token = Auth.getToken();
    if (!token) {
      this.props.history.push("/account/login?return=/account/settings/avatar");
      return;
    }

    // Construct data
    const data: IUserUpdateAvatar = {
      user: { token, password, avatarURL }
    };
    try {
      await this.props.UpdateAvatar({ data });

      //   // clear input and display flash
      //   this.setState({
      //     ...this.state,
      //     password: "",
      //     flashMessage: {
      //       isVisible: true,
      //       text: "Success! Display Name updated.",
      //       type: "success",
      //       slug: "/account/settings",
      //       slugText: "Back to Settings"
      //     }
      //   });
    } catch (err) {
      // Account locked
      if (err.response.status === 403) {
        this.props.logout();

        this.props.history.push("/account/login");
        return;
      }

      // Password bad or acc locked so going to reset
      this.setState({
        ...this.state,
        password: "",
        flashMessage: {
          isVisible: true,
          text: err.response.data.msg,
          type: "warning"
        }
      });
    }
  };

  private onTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event || !event.target) {
      return;
    }
    // Grab the name and value
    const { name, value }: { name: string; value: string } = event.target;

    // Update local state
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  private avatarImage(url: string): JSX.Element {
    return <StyledAvatarImg src={url} />;
  }

  private authorContribution(): JSX.Element {
    return (
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>{" "}
        is licensed by{" "}
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
        >
          {" "}
          CC 3.0 BY
        </a>
      </div>
    );
  }

  private onRadioClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (!event || !event.target) {
      return;
    }

    const { id }: { id: string } = event.target as HTMLTextAreaElement;

    this.setState({
      ...this.state,
      selected: id,
      flashMessage: { isVisible: false }
    });
  };
}

const mapState2Props = (state: AppState) => {
  return { user: state.users.self };
};

// For TS w/ redux-thunk: https://github.com/reduxjs/redux-thunk/issues/213#issuecomment-428380685
const mapDispatch2Props = (dispatch: MyThunkDispatch) => ({
  UpdateAvatar: ({ data }: { data: IUserUpdateAvatar }) =>
    dispatch(UpdateAvatar({ data })),
  logout: () => dispatch(logout())
});

export default connect(
  mapState2Props,
  mapDispatch2Props
)(UpdateAvatar);

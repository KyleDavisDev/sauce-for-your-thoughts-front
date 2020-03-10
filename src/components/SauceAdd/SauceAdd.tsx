import * as React from "react";
import shortid from "shortid";
import { connect } from "react-redux";

import { SauceTitle } from "./components/SauceTitle/SauceTitle";
import SauceDescription from "./components/SauceDescription/SauceDescription";
import SauceIngredients from "./components/SauceIngredients/SauceIngredients";
import SauceType from "./components/SauceType/SauceType";
import SauceSpice from "./components/SauceSpice/SauceSpice";
import SauceLocation from "./components/SauceLocation/SauceLocation";
import SaucePhoto from "./components/SaucePhoto/SaucePhoto";
import SauceReview from "./components/SauceReview/SauceReview";
import TopBar from "../TopBar/TopBar";
import Navigation from "../Navigation/Navigation";
import PageTitle from "../PageTitle/PageTitle";
import Footer from "../Footer/Footer";
import { Overlay } from "../Overlay/Overlay";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";
import { addSauce } from "../../redux/sauces/actions";
import { ISauce } from "../../redux/sauces/types";
import ArrowRight from "../../images/icons/ArrowRight";
import { AppState } from "../../redux/configureStore";
import Auth from "../../utils/Auth/Auth";
import { API } from "../../utils/api/API";
import { IErrReturn } from "../../utils/Err/Err";
import { Article, StyledFormContainer, StyledButton } from "./SauceAddStyle";

export interface SauceAddProps {
  addSauce?: ({ formData }: { formData: FormData }) => Promise<any>;
  history?: {
    replace: (location: string) => any;
    push: (location: string) => any;
  };
  user?: { token: string; name: string };
  types?: string[];
}

export interface SauceAddState extends ISauce {
  typesOfSauces: {
    [key: string]: { value: string; checked: boolean; key: string };
  };
  country: string;
  city: string;
  state: string;
  cropperOptions: {
    zoomOnWheel?: boolean;
    aspectRatio?: number;
    movable: boolean;
  };
  DropNCropValue: any;
  isImageLocked: boolean;
  addReview: boolean;
  flashMessage: FlashMessageProps;
  enabled: boolean;
}

class SauceAdd extends React.Component<SauceAddProps, SauceAddState> {
  constructor(props: SauceAddProps) {
    super(props);

    // Turn array of strings into object with key as array val
    const types: {
      [key: string]: { value: string; checked: boolean; key: string };
    } = {};

    if (this.props.types) {
      this.props.types.forEach(type => {
        if (type === "All") {
          // continue;
        } else {
          types[type] = {
            value: type,
            checked: false,
            key: shortid.generate()
          };
        }
      });
    }

    this.state = {
      _id: 0,
      name: "",
      ingredients: "",
      maker: "",
      description: "",
      photo: "",
      typesOfSauces: types,
      author: (this.props.user && this.props.user.name) || "",
      created: new Date(),
      shu: "",
      country: "United States",
      state: "",
      city: "",
      enabled: true,

      cropperOptions: { zoomOnWheel: false, aspectRatio: 2 / 3, movable: true },
      DropNCropValue: {},
      isImageLocked: false,
      addReview: true,
      flashMessage: {
        isVisible: false
      }
    };
  }

  public componentWillMount() {
    const { user, history } = this.props;

    // If no history, stop
    if (!history) {
      return (window.location.href = "/account/login?return=/sauce/add");
    }
    // If no user, stop
    if (!user) return history.replace("/account/login?return=/sauce/add");
    // If we don't have an author, stop
    if (!user.name) history.replace("/account/login?return=/sauce/add");
    // If no token, stop
    if (!user.token) history.replace("/account/login?return=/sauce/add");

    // Construct data obj
    const data = { user: { token: user.token } };

    // Find out if user is eligible to submit a review for this sauce or not
    API.sauces
      .canUserSubmit({ data })
      .then(res => {
        this.setState(prevState => {
          return { ...prevState, enabled: true };
        });
      })
      .catch((err: IErrReturn) => {
        // Disable form components and show flashmessage
        this.setState(prevState => {
          return {
            ...prevState,
            enabled: false,
            flashMessage: {
              isVisible: true,
              text: err.response.data.msg
            }
          };
        });
      });
  }

  public render() {
    return (
      <div>
        <TopBar />
        <Navigation />
        <Article>
          <PageTitle>Add Sauce</PageTitle>
          <StyledFormContainer>
            <form onSubmit={this.onSubmit} style={{ maxWidth: "100%" }}>
              {this.state.flashMessage.isVisible && (
                <FlashMessage type={this.state.flashMessage.type} isVisible>
                  {this.state.flashMessage.text}
                </FlashMessage>
              )}
              <Overlay enabled={this.state.enabled}>
                {/* Title */}
                <SauceTitle
                  onTextChange={this.onTextChange}
                  name={this.state.name}
                  maker={this.state.maker}
                />

                {/* Official Description */}
                <SauceDescription
                  onTextChange={this.onTextChange}
                  description={this.state.description}
                />

                {/* Ingredients */}
                <SauceIngredients
                  onTextChange={this.onTextChange}
                  ingredients={this.state.ingredients}
                />

                {/* Type */}
                <SauceType
                  typesOfSauces={this.state.typesOfSauces}
                  onCheckBoxClick={this.onCheckBoxClick}
                />

                {/* Spice */}
                <SauceSpice
                  shu={this.state.shu}
                  onTextChange={this.onTextChange}
                />

                {/* Location */}
                <SauceLocation
                  state={this.state.state}
                  city={this.state.city}
                  country={this.state.country}
                  onTextChange={this.onTextChange}
                  onCountryChange={this.onCountryChange}
                  onStateChange={this.onStateChange}
                />

                {/* Photo */}
                <SaucePhoto
                  DropNCropValue={this.state.DropNCropValue}
                  cropperOptions={this.state.cropperOptions}
                  isImageLocked={this.state.isImageLocked}
                  onDropNCropChange={this.onDropNCropChange}
                  onImageLock={this.onImageLock}
                  onClearImageClick={this.onClearImageClick}
                />

                {/* Review */}
                <SauceReview
                  onRadioClick={this.onRadioClick}
                  addReview={this.state.addReview}
                />

                <StyledButton onClick={() => {}} type="submit">
                  Submit
                  <ArrowRight />
                </StyledButton>
              </Overlay>
            </form>
          </StyledFormContainer>
        </Article>
        <Footer />
      </div>
    );
  }

  private onTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event || !event.target) {
      return;
    }

    // Grab the name and value
    const { name, value }: { name: string; value: string } = event.target;

    // Update local state
    this.setState({
      ...this.state,
      [name.toLowerCase()]: value
    });
  };

  private onCheckBoxClick = (
    event: React.MouseEvent<HTMLInputElement>
  ): void => {
    // Cast EventTarget to be HTMLInput Element so we can be sure to have a .value property
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;

    // Grab value from the element
    const value: string = checkbox.value;

    // Get whether checked or not
    const checked: boolean = this.state.typesOfSauces[value].checked;

    // Update state
    this.setState({
      ...this.state,
      typesOfSauces: {
        ...this.state.typesOfSauces,
        [value]: {
          ...this.state.typesOfSauces[value],
          value,
          checked: !checked
        }
      }
    });
  };

  private onRadioClick = (event: React.MouseEvent<HTMLInputElement>): void => {
    // Cast EventTarget to be HTMLInput Element so we can be sure to have a .value property
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;

    // Grab value from the element
    const value: boolean = checkbox.value === "Yes" ? true : false;

    this.setState({ ...this.state, addReview: value });
  };

  private onCountryChange = (val: string) => {
    this.setState({
      ...this.state,
      country: val
    });
  };

  private onStateChange = (val: string) => {
    this.setState({
      ...this.state,
      state: val
    });
  };

  private onDropNCropChange = (val: any) => {
    this.setState({ ...this.state, DropNCropValue: val });
  };

  private onSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    // Get array of checked types
    const types: string[] = Object.keys(this.state.typesOfSauces).filter(
      type => this.state.typesOfSauces[type].checked
    );

    const { user, history } = this.props;
    // If no history, stop
    if (!history) {
      window.location.href = "/account/login";
      return;
    }
    // If no user, stop
    if (!user) {
      history.push("/account/login");
      return;
    }

    // make sure token is still good/not expired
    if (!Auth.isUserAuthenticated()) history.push("/account/login");

    // Grab values
    const {
      name,
      maker,
      description,
      ingredients,
      shu,
      author,
      country,
      state,
      city
    } = this.state;

    const token = user.token;
    if (!token) history.push("/account/login");

    // Construct FormData since we are passing image file
    const formData = new FormData();
    // Create expected suace object
    const sauce: ISauce = {
      author,
      created: new Date(),
      name,
      maker,
      description,
      ingredients,
      shu,
      country,
      state,
      city,
      types
    };

    formData.append("sauce", JSON.stringify({ sauce }));

    // Append user
    formData.append("user", JSON.stringify({ user: { token } }));

    // Append image if available
    if (this.state.DropNCropValue.result) {
      // const lastModified = this.state.DropNCropValue.files[0].lastModified;
      const fileType = this.state.DropNCropValue.filetype;
      const blob = this.dataURItoBlob(this.state.DropNCropValue.result);
      const image = new File([blob], "image.png", {
        type: fileType
      });

      // append
      formData.append("image", image);
    }

    if (this.props.addSauce) {
      this.props
        .addSauce({ formData })
        .then(res => {
          // Go to sauce page if they do not want to add a review
          if (this.state.addReview === false) {
            history.push(`/sauce?s=${res}`);
          } else {
            // Go to review page for specific sauce
            history.push(`/review/add?s=${res}`);
          }
        })
        .catch(err => {
          // TODO better error handling

          // Move screen to top
          window.scrollTo(0, 0);

          // Create warning flash
          this.setState({
            ...this.state,
            flashMessage: {
              isVisible: true,
              text: err.response.data.msg,
              type: "warning"
            }
          });
        });
    } else {
      // error window?
    }
  };

  private dataURItoBlob = (dataURI: string) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0) {
      byteString = atob(dataURI.split(",")[1]);
    } else {
      byteString = unescape(dataURI.split(",")[1]);
    }

    // separate out the mime component
    const mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  };

  private onImageLock = (lock: boolean): void => {
    // Update state
    this.setState({
      ...this.state,
      isImageLocked: lock
    });
  };

  private onClearImageClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    this.setState({ ...this.state, isImageLocked: false, DropNCropValue: {} });
  };
}

function mapStateToProps(state: AppState): any {
  return {
    user: {
      token: state.users.self.token || "",
      name: state.users.self.displayName
    },
    types: state.sauces.types
  };
}

const mapDispatchToProps = {
  addSauce
};

export default connect(mapStateToProps, mapDispatchToProps)(SauceAdd);

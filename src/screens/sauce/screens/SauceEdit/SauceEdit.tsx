import * as React from "react";
import shortid from "shortid";
import "@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css";
import { connect } from "react-redux";
import queryString from "query-string";

import { SauceTitle } from "../SauceAdd/components/SauceTitle/SauceTitle";
import SauceDescription from "../SauceAdd/components/SauceDescription/SauceDescription";
import SauceIngredients from "../SauceAdd/components/SauceIngredients/SauceIngredients";
import SauceType from "../SauceAdd/components/SauceType/SauceType";
import SauceSpice from "../SauceAdd/components/SauceSpice/SauceSpice";
import SauceLocation from "../SauceAdd/components/SauceLocation/SauceLocation";
import SaucePhoto from "../SauceAdd/components/SaucePhoto/SaucePhoto";
import TopBar from "../../../../components/TopBar/TopBar";
import Navigation from "../../../../components/Navigation/Navigation";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import Footer from "../../../../components/Footer/Footer";
import { editSauce } from "../../../../redux/sauces/actions";
import { ISauce } from "../../../../redux/sauces/types";
import ArrowRight from "../../../../images/icons/ArrowRight";
import { AppState } from "../../../../redux/configureStore";
import Auth from "../../../../utils/Auth/Auth";
import {
  Article,
  StyledFormContainer,
  StyledButton
} from "../SauceAdd/SauceAddStyle";
import {
  FlashMessageProps,
  FlashMessage
} from "../../../../components/FlashMessage/FlashMessage";
import { API } from "../../../../utils/api/API";
import { IErrReturn } from "../../../../utils/Err/Err";
import { Overlay } from "../../../../components/Overlay/Overlay";

export interface SauceEditProps {
  editSauce?: ({ formData }: { formData: FormData }) => Promise<any>;
  history: {
    replace: (location: string) => any;
    push: (location: string) => any;
    location: { search: string };
  };
  user?: { token: string; name: string };
  types?: string[];
}

interface IDropNCropValue {
  error: string | null;
  filename: string;
  files?: File[];
  filetype: string;
  result: string;
  src: string;
}

export interface SauceEditState extends ISauce {
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
  DropNCropValue?: IDropNCropValue;
  isImageLocked: boolean;
  addReview: boolean;
  flashMessage: FlashMessageProps;
  enabled: boolean;
  slug: string;
}

class SauceEdit extends React.Component<SauceEditProps, SauceEditState> {
  constructor(props: SauceEditProps) {
    super(props);

    // Turn array of strings into object with key as array val
    const types: {
      [key: string]: { value: string; checked: boolean; key: string };
    } = {};

    if (this.props.types) {
      this.props.types.forEach(type => {
        types[type] = { value: type, checked: false, key: shortid.generate() };
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
      slug: "",

      cropperOptions: { zoomOnWheel: false, aspectRatio: 2 / 3, movable: true },
      DropNCropValue: undefined,
      isImageLocked: false,
      addReview: true,
      flashMessage: {
        isVisible: false
      }
    };
  }

  public async componentWillMount() {
    const { user, history } = this.props;

    // Find our slug -- If we can't find one, we are immediately done
    const values = queryString.parse(history.location.search);
    // Make sure s is defined, not an array
    if (!values.s || Array.isArray(values.s)) {
      // Stop here since we will not have a slug
      history.push("/");
      return;
    }
    // Assign slug
    const slug: string = values.s;

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

    try {
      // Construct data obj
      const data = { user: { token: user.token }, sauce: { slug } };
      // Make sure we can edit -- will be pushed into catch block if ineligible
      await API.sauce.canUserEdit({ data });

      const sauce: any = await API.sauce.edit({ data });

      // Init
      const types: {
        [key: string]: { value: string; checked: boolean; key: string };
      } = this.state.typesOfSauces || {};

      // Need to do some massaging to get 'types' how we want it
      // Loop through each 'type' and add necessary keys to it
      if (sauce.types) {
        // Loop through and add fields
        sauce.types.forEach((type: string) => {
          types[type] = {
            value: type,
            checked: true,
            key: shortid.generate()
          };
        });
      }

      // set state
      this.setState(prevState => {
        return { ...prevState, ...sauce, typesOfSauces: types, slug };
      });
    } catch (err) {
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
    }
  }

  public render() {
    return (
      <div>
        <TopBar />
        <Navigation />
        <Article>
          <PageTitle>Edit Sauce</PageTitle>
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
                  photo={this.state.photo}
                  onImageRemove={this.onImageRemove}
                  DropNCropValue={this.state.DropNCropValue}
                  cropperOptions={this.state.cropperOptions}
                  isImageLocked={this.state.isImageLocked}
                  onDropNCropChange={this.onDropNCropChange}
                  onImageLock={this.onImageLock}
                  onClearImageClick={this.onClearImageClick}
                />

                <StyledButton type="submit">
                  Update
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

    // Grab variables and sanity checks
    const token = Auth.getToken();
    const { user, history } = this.props;
    // If no history or user, stop
    if (!history || !user || !token) {
      window.location.href = "/account/login";
      return;
    }

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
      city,
      photo,
      slug
    } = this.state;

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
      types,
      photo,
      slug
    };

    formData.append("sauce", JSON.stringify({ sauce }));

    // Append user
    formData.append("user", JSON.stringify({ user: { token } }));

    // Append image if available
    if (this.state.DropNCropValue && this.state.DropNCropValue.result) {
      // const lastModified = this.state.DropNCropValue.files[0].lastModified;
      const fileType = this.state.DropNCropValue.filetype;
      const blob = this.dataURItoBlob(this.state.DropNCropValue.result);
      const image = new File([blob], "image.png", {
        type: fileType
      });

      // append
      formData.append("image", image);
    }

    if (this.props.editSauce) {
      this.props
        .editSauce({ formData })
        .then(res => {
          // Move screen to top
          window.scrollTo(0, 0);

          // Create warning flash
          this.setState({
            ...this.state,
            flashMessage: {
              isVisible: true,
              text: res.data.msg,
              type: "success"
            }
          });
        })
        .catch((err: IErrReturn) => {
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
    this.setState({
      ...this.state,
      isImageLocked: false,
      DropNCropValue: undefined
    });
  };

  private onImageRemove = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    this.setState({
      ...this.state,
      photo: undefined
    });
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
  editSauce
};

export default connect(mapStateToProps, mapDispatchToProps)(SauceEdit);

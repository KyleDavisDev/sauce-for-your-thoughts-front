import * as React from "react";
import shortid from "shortid";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import DropNCrop from "@synapsestudios/react-drop-n-crop";
import "@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css";
import { connect } from "react-redux";

import { addSauce } from "../../../../redux/sauces/actions";
import { ISauce } from "../../../../redux/sauce/types";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import { CheckBox } from "../../../../components/CheckBox/CheckBox";
import Label from "../../../../components/Label/Label";
import { RadioButton } from "../../../../components/RadioButton/RadioButton";
import { Button } from "../../../../components/Button/Button";
import ArrowRight from "../../../../images/icons/ArrowRight";

import { IinitialState } from "../../../../redux/configureStore";
import TopBar from "../../../../components/TopBar/TopBar";
import Navigation from "../../../../components/Navigation/Navigation";
import Footer from "../../../../components/Footer/Footer";
import {
  Article,
  StyledFormContainer,
  StyledRow,
  StyledDescriptor,
  StyledRightSide,
  StyledTextInput,
  StyledDiv,
  StyledDiv2,
  StyledDropdownContainer,
  StyledPhotoContainer,
  StyledButton,
  StyledImageButtonContainer
} from "./SauceAddStyle";
import Auth from "../../../../utils/Auth/Auth";

export interface SauceAddProps {
  addSauce: ({ formData }: { formData: FormData }) => Promise<any>;
  history: { push: (location: string) => any };
  user: { token: string; name: string };
  types: string[];
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
}

class SauceAdd extends React.Component<SauceAddProps, SauceAddState> {
  constructor(props: SauceAddProps) {
    super(props);

    // Turn array of strings into object with key as array val
    const types: {
      [key: string]: { value: string; checked: boolean; key: string };
    } = {};
    this.props.types.forEach(type => {
      types[type] = { value: type, checked: false, key: shortid.generate() };
    });

    this.state = {
      _id: 0,
      name: "Name here",
      ingredients: "abc, dvee,vasdfasdf,,asdfasdf,",
      maker: "Maker here",
      description:
        "Here will be a long description, maybe a few thing's too.      asd      gg",
      photo: "",
      typesOfSauces: types,
      author: this.props.user.name || "",
      created: new Date(),
      shu: "",
      country: "United States",
      state: "",
      city: "",

      cropperOptions: { zoomOnWheel: false, aspectRatio: 2 / 3, movable: true },
      DropNCropValue: {},
      isImageLocked: false,
      addReview: true
    };
  }

  public componentWillMount() {
    // If we don't have an author, don't let user go any further
    if (!this.props.user.name) this.props.history.push("/login");

    // If no token, don't go further
    if (!this.props.user.token) this.props.history.push("/login");
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
              <StyledRow>
                <StyledDescriptor title="Title">
                  What is the name of the sauce? Who is the maker? This is
                  required.
                </StyledDescriptor>
                <StyledRightSide>
                  <StyledTextInput
                    onChange={this.onTextChange}
                    label="Name"
                    name="name"
                    id="name"
                    showLabel={true}
                    value={this.state.name}
                    required={true}
                  />
                  <StyledTextInput
                    onChange={this.onTextChange}
                    label="Maker"
                    name="maker"
                    id="maker"
                    showLabel={true}
                    value={this.state.maker}
                    required={true}
                  />
                </StyledRightSide>
              </StyledRow>
              <StyledRow>
                <StyledDescriptor title="Official Description">
                  How does the maker describe the suace and/or flavor? This
                  might be found directly on the bottle, a website, in an email,
                  etc. This is NOT your review.
                </StyledDescriptor>
                <StyledRightSide>
                  <StyledTextInput
                    onChange={this.onTextChange}
                    label="Description"
                    name="description"
                    id="description"
                    showLabel={true}
                    value={this.state.description}
                    type="textarea"
                    required={true}
                  />
                </StyledRightSide>
              </StyledRow>
              <StyledRow>
                <StyledDescriptor title="Ingredients">
                  Which ingredients make up the sauce? This should be a comma
                  seperated list found somewhere on the sauce label.
                </StyledDescriptor>
                <StyledRightSide>
                  <StyledTextInput
                    onChange={this.onTextChange}
                    label="Ingredients"
                    name="ingredients"
                    id="ingredients"
                    showLabel={true}
                    value={this.state.ingredients}
                    type="textarea"
                    required={true}
                  />
                </StyledRightSide>
              </StyledRow>

              {/* Type */}
              <StyledRow>
                <StyledDescriptor title="Type">
                  What type of sauce is this? What is it primarily used for?
                </StyledDescriptor>
                <StyledRightSide>
                  <StyledDiv2>
                    <Label>Type of Sauce</Label>

                    {Object.keys(this.state.typesOfSauces).map(type => {
                      return (
                        <CheckBox
                          id={this.state.typesOfSauces[type].key}
                          key={this.state.typesOfSauces[type].key}
                          value={this.state.typesOfSauces[type].value}
                          label={this.state.typesOfSauces[type].value}
                          checked={this.state.typesOfSauces[type].checked}
                          onClick={this.onCheckBoxClick}
                        />
                      );
                    })}
                  </StyledDiv2>
                </StyledRightSide>
              </StyledRow>

              {/* Spice */}
              <StyledRow>
                <StyledDescriptor title="Spice">
                  Is this sauce spicy? How spicy is it? What does the maker say
                  the Scoville Heat Unit (SHU) rating is? Note: this may only be
                  applicable to Hot Sauces.
                </StyledDescriptor>
                <StyledRightSide>
                  <StyledTextInput
                    onChange={this.onTextChange}
                    label="SHU"
                    name="shu"
                    id="shu"
                    showLabel={true}
                    value={this.state.shu}
                  />
                </StyledRightSide>
              </StyledRow>

              {/* Location */}
              <StyledRow>
                <StyledDescriptor title="Location">
                  Where was the sauce made?
                </StyledDescriptor>
                <StyledRightSide>
                  <StyledDiv>
                    <Label>Country</Label>
                    <StyledDropdownContainer>
                      <CountryDropdown
                        value={this.state.country}
                        onChange={this.onCountryChange}
                      />
                    </StyledDropdownContainer>
                  </StyledDiv>

                  <StyledDiv>
                    <Label>State</Label>
                    <StyledDropdownContainer>
                      <RegionDropdown
                        country={this.state.country}
                        value={this.state.state}
                        onChange={this.onStateChange}
                      />
                    </StyledDropdownContainer>
                  </StyledDiv>
                  <StyledTextInput
                    onChange={this.onTextChange}
                    label="City"
                    name="city"
                    id="city"
                    showLabel={true}
                    value={this.state.city}
                  />
                </StyledRightSide>
              </StyledRow>

              {/* Photo */}
              <StyledRow>
                <StyledDescriptor title="Photo">
                  If you have a picture of the bottle, please upload it! If the
                  picture is unclear, blurry, or missing completely, an admin
                  may replace it with a different one.
                </StyledDescriptor>
                <StyledPhotoContainer>
                  <DropNCrop
                    ref="cropper"
                    onChange={this.onDropNCropChange.bind(this)}
                    value={this.state.DropNCropValue}
                    canvasWidth={"100%"}
                    cropperOptions={this.state.cropperOptions}
                    maxFileSize={4145728}
                  />

                  <StyledImageButtonContainer>
                    <Button onClick={this.onImageLock}>
                      {this.state.isImageLocked ? "Unlock Image" : "Lock Image"}
                    </Button>

                    <Button onClick={this.onClearImageClick}>
                      Clear Image
                    </Button>
                  </StyledImageButtonContainer>
                </StyledPhotoContainer>
              </StyledRow>

              {/* Review */}
              <StyledRow>
                <StyledDescriptor title="Review">
                  Would you like to add a review too? Do not review your own
                  sauce. Blatantly altering scores will get your account banned
                  and your review removed. Don't do it.
                </StyledDescriptor>
                <StyledRightSide>
                  <StyledDiv2>
                    <Label>Add Review</Label>

                    <RadioButton
                      id={shortid.generate()}
                      key={shortid.generate()}
                      value={"Yes"}
                      label={"Yes"}
                      checked={this.state.addReview}
                      onClick={this.onRadioClick}
                      name="addReview"
                    />
                    <RadioButton
                      id={shortid.generate()}
                      key={shortid.generate()}
                      value={"No"}
                      label={"No"}
                      checked={!this.state.addReview}
                      onClick={this.onRadioClick}
                      name="addReview"
                    />
                  </StyledDiv2>
                </StyledRightSide>
              </StyledRow>

              <StyledButton onClick={() => {}} type="submit">
                Submit
                <ArrowRight />
              </StyledButton>
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

    // make sure token is still good/not expired
    if (!Auth.isUserAuthenticated()) this.props.history.push("/login");

    const {
      name,
      maker,
      description,
      ingredients,
      shu,
      location,
      author
    } = this.state;

    const token = this.props.user.token;
    if (!token) this.props.history.push("/login");

    // construct FormData object since we are passing image file
    const sauce: ISauce = {
      _id: 1,
      author,
      created: new Date(),
      name,
      maker,
      description,
      ingredients,
      shu,
      location,
      types
    };

    const formData = new FormData();
    formData.append("sauce", JSON.stringify({ sauce }));
    formData.append("image", this.state.DropNCropValue.files[0]);
    formData.append("user", JSON.stringify({ user: { token } }));

    this.props
      .addSauce({ formData })
      .then(res => {
        // Go to sauce page if they do not want to add a review
        if (this.state.addReview === false) {
          this.props.history.push(`/sauce/${res.data.sauces[0].slug}`);
        }

        // Go to review page for specific sauce
        this.props.history.push(`/review/add/${res.data.sauces[0].slug}`);
      })
      .catch(err => {
        // TODO better error handling
      });
  };

  private onImageLock = (event: React.MouseEvent<HTMLButtonElement>): void => {
    // Find out if locked or not
    const isLocked: boolean = this.state.isImageLocked;

    if (isLocked) {
      // Unlock Cropper component
      // @ts-ignore
      this.refs.cropper.cropperRef.cropper.enable();
    } else {
      // Lock component
      // @ts-ignore
      this.refs.cropper.cropperRef.cropper.disable();
    }

    // Update state
    this.setState({
      ...this.state,
      isImageLocked: !isLocked
    });
  };

  private onClearImageClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    this.setState({ ...this.state, isImageLocked: false, DropNCropValue: {} });
  };
}

function mapStateToProps(state: IinitialState): any {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SauceAdd);

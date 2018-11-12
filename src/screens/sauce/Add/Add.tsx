import * as React from "react";
import shortid from "shortid";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from "react-country-region-selector";
import DropNCrop from "@synapsestudios/react-drop-n-crop";

import styled from "../../../theme/styled-components";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Descriptor from "../../../components/Descriptor/Descriptor";
import TextInput from "../../../components/TextInput/TextInput";

import { ISauce } from "../../../redux/sauce/types";
import CheckBox from "../../../components/CheckBox/CheckBox";
import Label from "../../../components/Label/Label";

const Article = styled.article`
  max-width: 900px;
  margin: 0 auto;

  > div {
    margin-bottom: 3.5rem;
  }
`;

const StyledFormContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: top;
  padding-bottom: 4rem;
`;

const StyledDescriptor = styled(Descriptor)`
  width: 100%;
  max-width: 33%;
  box-sizing: border-box;
  padding: 0 1rem;
`;

const StyledRightSide = styled.div`
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  display: block;
`;

const StyledTextInput = styled(TextInput)`
  float: left;
  max-width: ${props =>
    props.type === "textarea"
      ? "100%"
      : "50%"}; // give Textarea full width and text 50%
  box-sizing: border-box;
  padding: 0 1rem;
`;

const StyledDiv = styled.div`
  max-width: 50%;
  float: left;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;

  > label {
    padding: 0rem;
  }

  > div {
    // margin: 0.25rem 1rem 0.25rem;
  }
`;

const StyledDiv2 = styled.div`
  padding: 0 1rem;
`;

const StyledDropdownContainer = styled.div`
  border: 1px solid #e1e1e1;
  color: #4b4b4b;
  display: inline-block;
  position: relative;
  background-color: #f5f5f5;
  margin-bottom: 15px;
  width: 100%;

  &:after {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    content: url("../../../../../../images/icons/chevron-down.svg");
    pointer-events: none;
    right: 15px;
  }

  select {
    width: 100%;
    background-color: #f3f3f3;
    appearance: none;
    border: 0;
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: background-color 0.3s, color 0.3s, border 0.3s;
    vertical-align: middle;
    height: 38px;
    padding: 0px 40px 0 15px;
    font-size: 1rem;
  }
`;

const StyledDropNCrop = styled(DropNCrop)`
  .drop-n-crop {
    -webkit-box-orient: horizontal;
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    width: 100%;
  }
  .drop-n-crop,
  .dropzone {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-direction: normal;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .dropzone {
    -webkit-box-orient: vertical;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    background: #fff;
    border: 2px dashed #ddd;
    padding: 8px;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  .dropzone.dropzone--active {
    background: #f2f2f2;
    border-color: #b1b1b1;
  }
  .dropzone-instructions {
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  .dropzone.dropzone--active .dropzone-instructions {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
  .dropzone-instructions--main {
    color: #322d35;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .dropzone-instructions--sub {
    color: #201c23;
    font-style: italic;
    margin-top: 4px;
  }
  .dropzone-validation {
    color: #ff3d00;
    font-size: 16px;
    font-weight: 700;
    margin-top: 32px;
  }
  .cropper-container {
    font-size: 0;
    line-height: 0;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    direction: ltr;
    -ms-touch-action: none;
    touch-action: none;
  }
  .cropper-container img {
    display: block;
    min-width: 0 !important;
    max-width: none !important;
    min-height: 0 !important;
    max-height: none !important;
    width: 100%;
    height: 100%;
    image-orientation: 0;
  }
  .cropper-canvas,
  .cropper-crop-box,
  .cropper-drag-box,
  .cropper-modal,
  .cropper-wrap-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .cropper-wrap-box {
    overflow: hidden;
  }
  .cropper-drag-box {
    opacity: 0;
    background-color: #fff;
  }
  .cropper-modal {
    opacity: 0.5;
    background-color: #000;
  }
  .cropper-view-box {
    display: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    outline: 1px solid #39f;
    outline-color: rgba(51, 153, 255, 0.75);
  }
  .cropper-dashed {
    position: absolute;
    display: block;
    opacity: 0.5;
    border: 0 dashed #eee;
  }
  .cropper-dashed.dashed-h {
    top: 33.33333%;
    left: 0;
    width: 100%;
    height: 33.33333%;
    border-top-width: 1px;
    border-bottom-width: 1px;
  }
  .cropper-dashed.dashed-v {
    top: 0;
    left: 33.33333%;
    width: 33.33333%;
    height: 100%;
    border-right-width: 1px;
    border-left-width: 1px;
  }
  .cropper-center {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0;
    height: 0;
    opacity: 0.75;
  }
  .cropper-center:after,
  .cropper-center:before {
    position: absolute;
    display: block;
    content: " ";
    background-color: #eee;
  }
  .cropper-center:before {
    top: 0;
    left: -3px;
    width: 7px;
    height: 1px;
  }
  .cropper-center:after {
    top: -3px;
    left: 0;
    width: 1px;
    height: 7px;
  }
  .cropper-face,
  .cropper-line,
  .cropper-point {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0.1;
  }
  .cropper-face {
    top: 0;
    left: 0;
    background-color: #fff;
  }
  .cropper-line {
    background-color: #39f;
  }
  .cropper-line.line-e {
    top: 0;
    right: -3px;
    width: 5px;
    cursor: e-resize;
  }
  .cropper-line.line-n {
    top: -3px;
    left: 0;
    height: 5px;
    cursor: n-resize;
  }
  .cropper-line.line-w {
    top: 0;
    left: -3px;
    width: 5px;
    cursor: w-resize;
  }
  .cropper-line.line-s {
    bottom: -3px;
    left: 0;
    height: 5px;
    cursor: s-resize;
  }
  .cropper-point {
    width: 5px;
    height: 5px;
    opacity: 0.75;
    background-color: #39f;
  }
  .cropper-point.point-e {
    top: 50%;
    right: -3px;
    margin-top: -3px;
    cursor: e-resize;
  }
  .cropper-point.point-n {
    top: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: n-resize;
  }
  .cropper-point.point-w {
    top: 50%;
    left: -3px;
    margin-top: -3px;
    cursor: w-resize;
  }
  .cropper-point.point-s {
    bottom: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: s-resize;
  }
  .cropper-point.point-ne {
    top: -3px;
    right: -3px;
    cursor: ne-resize;
  }
  .cropper-point.point-nw {
    top: -3px;
    left: -3px;
    cursor: nw-resize;
  }
  .cropper-point.point-sw {
    bottom: -3px;
    left: -3px;
    cursor: sw-resize;
  }
  .cropper-point.point-se {
    right: -3px;
    bottom: -3px;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    opacity: 1;
  }
  @media (min-width: 768px) {
    .cropper-point.point-se {
      width: 15px;
      height: 15px;
    }
  }
  @media (min-width: 992px) {
    .cropper-point.point-se {
      width: 10px;
      height: 10px;
    }
  }
  @media (min-width: 1200px) {
    .cropper-point.point-se {
      width: 5px;
      height: 5px;
      opacity: 0.75;
    }
  }
  .cropper-point.point-se:before {
    position: absolute;
    right: -50%;
    bottom: -50%;
    display: block;
    width: 200%;
    height: 200%;
    content: " ";
    opacity: 0;
    background-color: #39f;
  }
  .cropper-invisible {
    opacity: 0;
  }
  .cropper-bg {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
  }
  .cropper-hide {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
  }
  .cropper-hidden {
    display: none !important;
  }
  .cropper-move {
    cursor: move;
  }
  .cropper-crop {
    cursor: crosshair;
  }
  .cropper-disabled .cropper-drag-box,
  .cropper-disabled .cropper-face,
  .cropper-disabled .cropper-line,
  .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }
`;

export interface AddProps {}

export interface AddState extends ISauce {
  typesOfSauces: { [key: string]: { value: string; checked: boolean } };
  typesOfPeppers: { [key: string]: { value: string; checked: boolean } };
  country: string;
  city: string;
  state: string;
  DropNCrop: {
    result: null | string;
    filename: null | string;
    filetype: null | string;
    src: null | string;
    error: null | string;
  };
  DropNCropValue: any;
}

class Add extends React.Component<AddProps, AddState> {
  constructor(props: AddProps) {
    super(props);

    this.state = {
      _id: 0,
      name: "",
      ingredients: "",
      type: "",
      maker: "",
      description: "",
      photo: "",
      typesOfSauces: {
        "BBQ Sauce": { value: "BBQ Sauce", checked: false },
        "Hot Sauce": { value: "Hot Sauce", checked: false }
      },
      typesOfPeppers: {
        "Ghost Chili": { value: "Ghost Chili", checked: false },
        "Peri Peri": { value: "Peri Peri", checked: false },
        "Scotch Bonnet": { value: "Scotch Bonnet", checked: false },
        "Trinidad Scorpion": { value: "Trinidad Scorpion", checked: false }
      },
      country: "United States",
      state: "",
      city: "",
      DropNCrop: {
        result: null,
        filename: null,
        filetype: null,
        src: null,
        error: null
      },
      DropNCropValue: {}
    };
  }

  public render() {
    return (
      <div>
        <Article>
          <PageTitle>Add Sauce</PageTitle>
          <StyledFormContainer>
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
                How does the maker describe the suace and/or flavor? This might
                be found directly on the bottle, a website, in an email, etc.
                This is NOT your review.
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
                        id={shortid.generate()}
                        key={shortid.generate()}
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
                the Scoville Heat Unit (SHU) rating is? Which peppers are
                primarily used?
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

                <StyledDiv2>
                  <Label>Primary Peppers</Label>
                  {Object.keys(this.state.typesOfPeppers).map(type => {
                    return (
                      <CheckBox
                        id={shortid.generate()}
                        key={shortid.generate()}
                        value={this.state.typesOfPeppers[type].value}
                        label={this.state.typesOfPeppers[type].value}
                        checked={this.state.typesOfPeppers[type].checked}
                        onClick={this.onCheckBoxClick}
                      />
                    );
                  })}
                </StyledDiv2>
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
                picture is unclear, blurry, or missing completely, an admin may
                replace it with a different one.
              </StyledDescriptor>
              <StyledRightSide>
                <StyledDropNCrop
                  onChange={this.onDropNCropChange}
                  value={this.state.DropNCropValue}
                />
              </StyledRightSide>
            </StyledRow>
          </StyledFormContainer>
        </Article>
      </div>
    );
  }

  private onTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event || !event.target || !event.target.value) {
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

    // Find is value is sauce type or pepper
    const type =
      Object.keys(this.state.typesOfSauces).indexOf(value) !== -1
        ? "typesOfSauces"
        : "typesOfPeppers";

    // Get whether checked or not
    const checked: boolean = this.state[type][value].checked;

    // Update state
    this.setState({
      ...this.state,
      [type]: {
        ...this.state[type],
        [value]: { value, checked: !checked }
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
    console.log(val);
    this.setState({ ...this.state, DropNCropValue: val });
  };
}

export default Add;

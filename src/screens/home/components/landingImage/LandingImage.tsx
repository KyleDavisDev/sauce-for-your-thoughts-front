import * as React from "react";

import styled from "../../../../theme/styled-components";
import DropDown from "./components/DropDown/DropDown";
import Input from "./components/Input/Input";

const HeroContainer = styled.header`
  background: #000;
  position: relative;
`;

const HeroImage = styled.div`
  background-image: url("../../../../images/photos/Sauces.jpg");
  background-size: cover;
  background-position-y: 45%;
  opacity: 0.45;
  height: 400px;
`;

const HeroBody = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 2em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const HeroTitle = styled.h1`
  color: ${x => x.theme.landingHeroTextColor};
`;

export interface LandingImageProps {}

export interface LandingImageState {
  search: {
    value: string;
  };
  filter: {
    all: string[];
    selected: string;
  };
}

class LandingImage extends React.Component<
  LandingImageProps,
  LandingImageState
> {
  constructor(props: LandingImageProps) {
    super(props);

    this.state = {
      search: { value: "" },
      filter: { all: ["All", "Hot Sauce", "Meat Sauce"], selected: "all" }
    };
  }

  public render(): JSX.Element {
    return (
      <HeroContainer>
        <HeroImage />
        <HeroBody>
          <HeroTitle>Find your perfect sauce</HeroTitle>
          <div>
            <DropDown options={this.state.filter.all} />
            <Input
              id="Hero__Search"
              name="Hero__Search"
              onChange={this.onTextChange}
              value={this.state.search.value}
            />
          </div>
        </HeroBody>
      </HeroContainer>
    );
  }

  private onTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event || !event.target || !event.target.value) {
      return;
    }

    // Grab the value
    const value: string = event.target.value;

    // Update local state
    this.setState({
      ...this.state,
      search: {
        value
      }
    });
  };
}

export default LandingImage;

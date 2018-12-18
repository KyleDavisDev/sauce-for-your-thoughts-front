import * as React from "react";

import styled from "../../../../theme/styled-components";
import DropDown from "../../../../components/DropDown/DropDown";
import TextInput from "../../../../components/TextInput/TextInput";
import { Link } from "../../../../components/Link/Link";

const HeroContainer = styled.header`
  background: #000;
  position: relative;
  margin-bottom: 1em;
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

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const StyledDropDown = styled(DropDown)`
  min-height: 30px;
`;

const StyledInput = styled(TextInput)`
  flex-direction: row;
  align-items: stretch;

  input {
    border: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    width: 100%;
    min-width: 20em;
    max-width: 100%;
    padding: 0.66em;
    box-sizing: border-box;
    border: 0px;
    font-size: 1em;
  }
`;

const StyledLink = styled(Link)`
  a {
    display: flex;
    align-items: center;
  }
`;

export interface LandingImageProps {
  className?: string;
}

export interface LandingImageState {
  search: {
    value: string;
  };
  filter: {
    all: string[];
    selectedValue: string;
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
      filter: { all: ["All", "Hot Sauce", "Meat Sauce"], selectedValue: "all" }
    };
  }

  public render(): JSX.Element {
    return (
      <HeroContainer className={this.props.className}>
        <HeroImage />
        <HeroBody>
          <HeroTitle>Find your perfect sauce</HeroTitle>
          <StyledDiv>
            <StyledDropDown
              options={this.state.filter.all}
              selectedValue={this.state.filter.selectedValue}
              onSelect={this.onSelect}
            />
            <StyledInput
              type="text"
              id="Hero__Search"
              name="Hero__Search"
              onChange={this.onTextChange}
              value={this.state.search.value}
              placeholder="Search..."
            />
            <StyledLink to="#">Search</StyledLink>
          </StyledDiv>
        </HeroBody>
      </HeroContainer>
    );
  }

  private onSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (!event || !event.target || !event.target.value) {
      return;
    }

    // Grab the value
    const selectedValue: string = event.target.value;

    // Update local state
    this.setState({
      ...this.state,
      filter: {
        ...this.state.filter,
        selectedValue
      }
    });
  };

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

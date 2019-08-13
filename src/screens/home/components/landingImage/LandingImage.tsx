import * as React from "react";
import { connect } from "react-redux";

import { AppState } from "../../../../redux/configureStore";
import {
  HeroContainer,
  HeroImage,
  HeroBody,
  HeroTitle,
  StyledDiv,
  StyledDropDown,
  StyledInput,
  StyledButton
} from "./LandingImageStyle";

export interface LandingImageProps {
  className?: string;
  types: string[];
  history: { push: (location: string) => any };
}

export interface LandingImageState {
  search: {
    value: string;
  };
  filter: {
    types: string[];
    selectedValue: string;
  };
}

class LandingImage extends React.Component<
  LandingImageProps,
  LandingImageState
> {
  constructor(props: LandingImageProps) {
    super(props);

    const types: string[] = ["All", ...this.props.types];

    this.state = {
      search: { value: "" },
      filter: { types, selectedValue: "all" }
    };
  }

  public render() {
    return (
      <HeroContainer className={this.props.className}>
        <HeroImage />
        <HeroBody>
          <HeroTitle>Find your perfect sauce</HeroTitle>
          <form onSubmit={this.onSubmit}>
            <StyledDiv>
              <StyledDropDown
                options={this.state.filter.types}
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

              <StyledButton type="submit">Search</StyledButton>
            </StyledDiv>
          </form>
        </HeroBody>
      </HeroContainer>
    );
  }

  private onSubmit = async (event: React.FormEvent): Promise<null> => {
    event.preventDefault();

    // take person to sauces page w/ prefilled search query
    this.props.history.push(`/sauces?limit=5&order=newest&page=1`);
    return null;
  };

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

const mapState2Props = (state: AppState) => {
  return { types: state.sauces.types };
};

export default connect(mapState2Props)(LandingImage);

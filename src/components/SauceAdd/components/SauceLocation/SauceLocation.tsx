import * as React from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

import {
  StyledRow,
  StyledDescriptor,
  StyledRightSide,
  StyledDiv,
  StyledDropdownContainer,
  StyledTextInput
} from "../../SauceAddStyle";
import Label from "../../../Label/Label";

export interface ISauceLocationProps {
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryChange: (val: string) => void;
  onStateChange: (val: string) => void;
  country: string;
  state: string;
  city: string;
}

export default class SauceLocation extends React.PureComponent<
  ISauceLocationProps,
  any
> {
  public render() {
    return (
      <StyledRow>
        <StyledDescriptor title="Location">
          Where was the sauce made?
        </StyledDescriptor>
        <StyledRightSide>
          <StyledDiv>
            <Label>Country</Label>
            <StyledDropdownContainer>
              <CountryDropdown
                value={this.props.country}
                onChange={this.props.onCountryChange}
              />
            </StyledDropdownContainer>
          </StyledDiv>

          <StyledDiv>
            <Label>State</Label>
            <StyledDropdownContainer>
              <RegionDropdown
                country={this.props.country}
                value={this.props.state}
                onChange={this.props.onStateChange}
              />
            </StyledDropdownContainer>
          </StyledDiv>
          <StyledTextInput
            onChange={this.props.onTextChange}
            label="City"
            name="city"
            id="city"
            showLabel={true}
            value={this.props.city}
          />
        </StyledRightSide>
      </StyledRow>
    );
  }
}

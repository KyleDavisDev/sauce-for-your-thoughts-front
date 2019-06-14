import * as React from "react";

import {
  StyledRow,
  StyledDescriptor,
  StyledRightSide,
  StyledTextInput
} from "../../SauceAddStyle";

export interface ISauceTitleProps {
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  maker: string;
}

export function SauceTitle(props: ISauceTitleProps) {
  return (
    <StyledRow>
      <StyledDescriptor title="Title">
        What is the name of the sauce? Who is the maker? This is required.
      </StyledDescriptor>
      <StyledRightSide>
        <StyledTextInput
          onChange={props.onTextChange}
          label="Name"
          name="name"
          id="name"
          showLabel={true}
          value={props.name}
          required={true}
        />
        <StyledTextInput
          onChange={props.onTextChange}
          label="Maker"
          name="maker"
          id="maker"
          showLabel={true}
          value={props.maker}
          required={true}
        />
      </StyledRightSide>
    </StyledRow>
  );
}

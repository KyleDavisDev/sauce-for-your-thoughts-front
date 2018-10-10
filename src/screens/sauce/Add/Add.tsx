import * as React from "react";

import styled from "../../../theme/styled-components";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Descriptor from "../../../components/Descriptor/Descriptor";

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

const StyledDescriptor = styled(Descriptor)`
  max-width: 33%;
  box-sizing: border-box;
  padding: 0 1rem;
`;

export interface AddProps {}

export interface AddState {}

class Add extends React.Component<AddProps, AddState> {
  constructor(props: AddProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>
        <Article>
          <PageTitle>Add Sauce</PageTitle>
          <StyledFormContainer>
            <StyledDescriptor title="Title">
              What is the name of the sauce? Who is the maker? This is required.
            </StyledDescriptor>
          </StyledFormContainer>
        </Article>
      </div>
    );
  }
}

export default Add;

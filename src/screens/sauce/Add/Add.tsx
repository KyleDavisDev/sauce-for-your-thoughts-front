import * as React from "react";

import styled from "../../../theme/styled-components";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Descriptor from "../../../components/Descriptor/Descriptor";
import TextInput from "../../../components/TextInput/TextInput";

import { ISauce } from "../../../redux/sauce/types";

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
  padding-bottom: 2rem;
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
  display: flex;
  flex-wrap: wrap;
`;

const StyledTextInput = styled(TextInput)`
  width: 100%;
  max-width: ${props =>
    props.type === "textarea"
      ? "100%"
      : "50%"}; // give Textarea full width and text 50%
  box-sizing: border-box;
  padding: 0 1rem;
`;

export interface AddProps {}

export interface AddState extends ISauce {}

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
      photo: ""
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
                />
                <StyledTextInput
                  onChange={this.onTextChange}
                  label="Maker"
                  name="maker"
                  id="maker"
                  showLabel={true}
                  value={this.state.maker}
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

    // Grab the value
    const { name, value }: { name: string; value: string } = event.target;

    // Update local state
    this.setState({
      ...this.state,
      [name.toLowerCase()]: value
    });
  };
}

export default Add;

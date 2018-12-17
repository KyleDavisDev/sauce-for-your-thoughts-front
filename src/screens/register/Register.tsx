import * as React from "react";
import { connect } from "react-redux";
import LogoSFYT from "../../images/icons/LogoSFYT";
import styled from "styled-components";
import Article from "../../components/Article/Article";
import PageTitle from "../../components/PageTitle/PageTitle";
import TextInput from "../../components/TextInput/TextInput";

const StyledLogoContainer = styled.div`
  max-width: 150px;
  margin: 0 auto;
  padding: 1em;
`;

const StyledArticle = styled(Article)`
  max-width: 600px;
`;
const StyledFormContainer = styled.div`
  background-color: ${props => props.theme.formContainerBackgroundColor};
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export interface RegisterProps {}

export interface RegisterState {}

class Register extends React.Component<RegisterProps, any> {
  public render() {
    return (
      <div>
        <StyledLogoContainer>
          <LogoSFYT />
        </StyledLogoContainer>
        <hr />
        <StyledArticle>
          <PageTitle>Register</PageTitle>
          <StyledFormContainer>
            <TextInput
              type="text"
              onChange={() => {}}
              showLabel={true}
              label={"Email"}
              required={true}
            />
            <TextInput
              type="text"
              onChange={() => {}}
              showLabel={true}
              label={"Confirm Email"}
              required={true}
            />
            <TextInput
              type="text"
              onChange={() => {}}
              showLabel={true}
              label={"Password"}
              required={true}
            />
            <TextInput
              type="text"
              onChange={() => {}}
              showLabel={true}
              label={"Confirm Password"}
              required={true}
            />
            <TextInput
              type="text"
              onChange={() => {}}
              showLabel={true}
              label={"Display Name"}
              required={true}
            />
          </StyledFormContainer>
        </StyledArticle>
      </div>
    );
  }
}

const mapState2Props = state => {
  return {};
};

export default connect(mapState2Props)(Register);

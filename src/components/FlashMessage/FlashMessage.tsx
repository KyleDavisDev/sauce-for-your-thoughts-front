import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IinitialState } from "../../redux/configureStore";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  width: 100%;
  margin-bottom: 15px;
`;

export interface FlashMessageProps {
  className?: string;
  type: "success" | "warning" | "alert";
  isVisible: boolean;
  slug?: string;
  text: string;
}

class FlashMessage extends React.Component<FlashMessageProps, any> {
  public render() {
    return (
      this.props.isVisible && (
        <StyledContainer className={this.props.className}>
          {this.props.text}
        </StyledContainer>
      )
    );
  }
}

const StyledFlashMessage = styled(FlashMessage)`
  background-color: ${props =>
    props.type === "success"
      ? "#dff0d8"
      : props.type === "warning"
      ? "#fcf8e3"
      : "#f2dede"};
  border-left: ${props =>
    props.type === "success"
      ? "#d0e9c6"
      : props.type === "warning"
      ? "#faf2cc"
      : "#ebcccc"};
  color: ${props =>
    props.type === "success"
      ? "#3c763d"
      : props.type === "warning"
      ? "#8a6d3b"
      : "#a94442"};
`;

const mapState2Props = (state: IinitialState) => {
  const { isVisible, type, text, slug } = state.flashMessage;
  return { isVisible, type, text, slug };
};

export default connect(mapState2Props)(StyledFlashMessage);

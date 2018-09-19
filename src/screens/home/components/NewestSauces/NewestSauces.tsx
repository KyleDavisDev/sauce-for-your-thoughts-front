import * as React from "react";

import styled from "../../../../theme/styled-components";
import Card from "../../../../components/Card/Card";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1em;
`;

const StyledCard = styled(Card)`
  box-sizing: border-box;
  width: 33%;
`;

export interface NewestSaucesProps {
  className?: string;
}

export interface NewestSaucesState {}

export default class NewestSauces extends React.Component<
  NewestSaucesProps,
  NewestSaucesState
> {
  constructor(props: NewestSaucesProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <StyledDiv className={this.props.className}>
        <SectionTitle
          title="Newest Sauces"
          description="We are always adding new sauces to our knowledgebase!"
        />
        <StyledCard
          anchorLink="#"
          title="test"
          imageLink="https://as.ftcdn.net/r/v1/pics/2fd8819a419c4245e5429905770db4b570661f48/home/discover_collections/Images.jpg"
          description="description here"
        />
        <StyledCard
          anchorLink="#"
          title="test"
          imageLink="https://as.ftcdn.net/r/v1/pics/2fd8819a419c4245e5429905770db4b570661f48/home/discover_collections/Images.jpg"
          description="description here"
        />
        <StyledCard
          anchorLink="#"
          title="test"
          imageLink="https://as.ftcdn.net/r/v1/pics/2fd8819a419c4245e5429905770db4b570661f48/home/discover_collections/Images.jpg"
          description="description here"
        />
      </StyledDiv>
    );
  }
}

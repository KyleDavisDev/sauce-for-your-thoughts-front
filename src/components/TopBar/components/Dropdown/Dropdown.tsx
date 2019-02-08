import * as React from "react";

import Trigger from "../Trigger/Trigger";
import Body from "../Body/Body";
import styled from "styled-components";
import { findDOMNode } from "react-dom";

const StyledDiv = styled.div`
  position: relative;
`;

export interface DropdownProps {
  children: JSX.Element[];
  className?: string;
  onClose?: () => void;
  onOpen?: () => void;
}

export interface DropdownState {
  active: boolean;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props);

    this.state = { active: false };
  }

  public componentDidMount() {
    // Needs to be removed when component unmounts
    window.addEventListener("click", this.onWindowClick);
  }

  public componentWillUnmount() {
    // No need to have global click event when component unmounted
    window.removeEventListener("click", this.onWindowClick);
  }

  public render() {
    let TriggerChild: null | JSX.Element = null;
    let BodyChild: null | JSX.Element = null;

    for (let i = 0, len = this.props.children.length; i < len; i++) {
      // Grab child
      const child: JSX.Element = this.props.children[i];

      // Grab first Trigger/Styled(Trigger) child
      if (
        (child.type.displayName === "Trigger" ||
          child.type.displayName === "Styled(Trigger)") &&
        TriggerChild === null
      ) {
        TriggerChild = React.cloneElement(child, {
          onClick: (event: React.MouseEvent) => {
            this.onToggleClick(event); // pass onclick to child
          }
        });
      }

      // Grab first Body/Styled(Body) child
      if (
        (child.type.displayName === "Body" ||
          child.type.displayName === "Styled(Body)") &&
        BodyChild === null
      ) {
        BodyChild = React.cloneElement(child, {});
      }

      // If both are assigned, we can stop looping
      if (TriggerChild !== null && BodyChild !== null) break;
    }

    return (
      <StyledDiv className={this.props.className}>
        {TriggerChild}
        {this.state.active && BodyChild}
      </StyledDiv>
    );
  }

  private onToggleClick = (event: React.MouseEvent): void => {
    event.preventDefault();

    // Show or hide BodyChild based on state
    this.isActive() ? this.close() : this.open();
  };

  private isActive = (): boolean => {
    return this.state.active;
  };

  private close = (): void => {
    this.setState(
      {
        active: false
      },
      () => {
        if (this.props.onClose) {
          this.props.onClose(); // Call passed function if there
        }
      }
    );
  };

  private open = (): void => {
    this.setState(
      {
        active: true
      },
      () => {
        if (this.props.onOpen) {
          this.props.onOpen(); // Call passed function if there
        }
      }
    );
  };

  private onWindowClick = (event: any): void => {
    // Simple check to see if we need to do the more heavy-lifting stuff or not
    if (!this.isActive()) return;

    // Find Dropdown elemtn
    const dropDownElem = findDOMNode(this);

    if (dropDownElem === null) return;

    if (
      event.target !== dropDownElem && // If the clicked element is NOT Dropdown iteself
      !dropDownElem.contains(event.target) // If the clicked element isn't contained inside of Dropdown
    ) {
      this.close(); // Close dropdown
    }
  };
}

export { Trigger, Body, Dropdown };

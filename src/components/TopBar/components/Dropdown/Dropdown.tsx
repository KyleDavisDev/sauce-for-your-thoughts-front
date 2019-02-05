import * as React from "react";

import Trigger from "../Trigger/Trigger";
import Body from "../Body/Body";

export interface DropdownProps {
  children: JSX.Element[];
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

  public render() {
    let TriggerChild: null | JSX.Element = null;
    let BodyChild: null | JSX.Element = null;

    for (let i = 0, len = this.props.children.length; i < len; i++) {
      // Grab child
      const child: JSX.Element = this.props.children[i];

      // Grab first Trigger elem
      if (child.type.displayName === "Trigger" && TriggerChild === null) {
        TriggerChild = React.cloneElement(child, {
          onClick: (event: React.MouseEvent) => {
            this.onToggleClick(event); // pass onclick to child
          }
        });
      }

      // Grab first Body elem
      if (child.type.displayName === "Body" && BodyChild === null) {
        BodyChild = React.cloneElement(child, {});
      }

      // If both are assigned, we can leave the loop
      if (TriggerChild !== null && BodyChild !== null) break;
    }

    return (
      <div>
        {TriggerChild}
        {this.state.active && BodyChild}
      </div>
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
}

export { Trigger, Body, Dropdown };

import * as React from "react";
import { findDOMNode } from "react-dom";

import styled from "../../theme/styled-components";

const StyledDiv = styled.div`
  position: relative;
  margin-right: 2em;
`;
StyledDiv.displayName = "div";

export interface DropdownProps {
  children: JSX.Element[];
  className?: string;
}

export interface DropdownState {
  active: boolean;
}

const Dropdown: React.FC<DropdownProps> = props => {
  const [isActive, setIsActive] = React.useState(false);

  const dropDownRef = React.useRef(null);

  // Create memoized function that updates when children change or isActive changes
  const onWindowClick = React.useCallback(
    event => {
      // Quick sanity check -- If the menu isn't even open, then we don't need to do anything
      if (!isActive) return;

      // Find this component in the DOM
      const dropDownElem = dropDownRef.current as Element | null;
      if (dropDownElem === null) return;

      // Check for valid clicked target
      const isClickedElementValidNode = event.target instanceof Node;
      if (!isClickedElementValidNode) return;

      // Check if click was inside this FunctionalComponent or outside
      const isClickedElementWithinComponent = dropDownElem.contains(
        event.target
      );
      if (isClickedElementWithinComponent) return;

      setIsActive(false); // Close dropdown
    },
    [isActive, props.children]
  );

  // assign and remove window click event
  React.useEffect(() => {
    // Needs to be removed when component unmounts
    window.addEventListener("click", onWindowClick);

    return () => {
      // Needs to be removed when component unmounts
      window.removeEventListener("click", onWindowClick);
    };
  }, [onWindowClick]);

  const [ToggleChild, MenuChild] = findAndAssignElements();

  return (
    <StyledDiv className={props.className} ref={dropDownRef}>
      {ToggleChild}
      {isActive && MenuChild}
    </StyledDiv>
  );

  function findAndAssignElements() {
    let _toggleChild: null | JSX.Element = null,
      _menuChild: null | JSX.Element = null;

    props.children.forEach(child => {
      // Quick escape if we have assignment
      if (_toggleChild !== null && _menuChild !== null) return;

      // grab name of child
      const name = child.type.name || child.type.displayName;

      if (name === "Toggle" && _toggleChild === null) {
        _toggleChild = React.cloneElement(child, {
          onClick: (event: React.MouseEvent) => {
            onToggleClick(event); // pass onclick to child
          }
        });
      }

      if (name === "Menu" && _menuChild === null) {
        _menuChild = React.cloneElement(child, {});
      }
    });

    return [_toggleChild, _menuChild];
  }

  function onToggleClick(event: React.MouseEvent): void {
    event.preventDefault();

    // Show or hide BodyChild based on state
    setIsActive(!isActive);
  }
};

export default Dropdown;

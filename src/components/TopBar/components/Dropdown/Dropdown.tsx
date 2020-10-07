import * as React from "react";
import { findDOMNode } from "react-dom";

import styled from "../../../../theme/styled-components";

const StyledDiv = styled.div`
  position: relative;
  margin-right: 2em;
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

const Dropdown: React.FC<DropdownProps> = props => {
  const [isActive, setIsActive] = React.useState(false);

  const dropDownRef = React.useRef(null);

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

  // assign window click event on load
  React.useEffect(() => {
    // Needs to be removed when component unmounts
    window.addEventListener("click", onWindowClick);

    return () => {
      // Needs to be removed when component unmounts
      window.removeEventListener("click", onWindowClick);
    };
  }, [onWindowClick]);

  const [ToggleChild, BodyChild] = findAndAssignElements();

  return (
    <StyledDiv className={props.className} ref={dropDownRef}>
      {ToggleChild}
      {isActive && BodyChild}
    </StyledDiv>
  );

  function findAndAssignElements() {
    let _toggleChild: null | JSX.Element = null,
      _bodyChild: null | JSX.Element = null;

    props.children.forEach(child => {
      // Quick escape if we have assignment
      if (_toggleChild !== null && _bodyChild !== null) return;

      if (child.type.displayName === "Toggle" && _toggleChild === null) {
        _toggleChild = React.cloneElement(child, {
          onClick: (event: React.MouseEvent) => {
            onToggleClick(event); // pass onclick to child
          }
        });
      }

      if (
        (child.type.displayName === "Body" ||
          child.type.displayName === "Styled(Body)") &&
        _bodyChild === null
      ) {
        _bodyChild = React.cloneElement(child, {});
      }
    });

    return [_toggleChild, _bodyChild];
  }

  function onToggleClick(event: React.MouseEvent): void {
    event.preventDefault();

    // Show or hide BodyChild based on state
    setIsActive(!isActive);
  }
};

export default Dropdown;

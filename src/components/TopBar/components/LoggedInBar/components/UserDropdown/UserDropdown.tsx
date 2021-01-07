import * as React from "react";

import styled from "../../../../../../theme/styled-components";
import Menu from "../Menu/Menu";
import Toggle from "../Toggle/Toggle";

const StyledDiv = styled.div`
  position: relative;
  margin-right: 2em;
`;
StyledDiv.displayName = "div";

export interface UserDropdownProps {}

const UserDropdown: React.FC<UserDropdownProps> = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const dropDownRef = React.useRef(null);

  // A memoized function for checking if the user's mouse click was inside of this component or not
  const onWindowClick = React.useCallback(
    event => {
      // Quick sanity check -- If the menu isn't even open, then we don't need to do anything
      if (!isOpen) return;

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

      setIsOpen(false); // Close dropdown
    },
    [isOpen]
  );

  // assign and remove window click event
  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", onWindowClick);
    } else {
      window.removeEventListener("click", onWindowClick);
    }

    return () => {
      // Make sure that listener is removed
      window.removeEventListener("click", onWindowClick);
    };
  }, [onWindowClick, isOpen]);

  return (
    <StyledDiv ref={dropDownRef}>
      <Toggle onClick={e => onToggleClick(e)} />

      {isOpen && <Menu />}
    </StyledDiv>
  );

  function onToggleClick(event?: React.MouseEvent): void {
    if (event) event.preventDefault();

    // Show or hide BodyChild based on state
    setIsOpen(!isOpen);
  }
};

export default UserDropdown;

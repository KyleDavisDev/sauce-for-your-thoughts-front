import * as React from "react";
import styled from "styled-components";

export interface IOverlayProps {
  children: any;
  className?: string;
  enabled?: boolean;
}

const Overlay: React.FunctionComponent<IOverlayProps> = props => {
  const { className, children } = props;

  return (
    <div className={className}>
      <div id="overlay" />
      {children}
    </div>
  );
};

const StyledOverlay = styled(Overlay)`
  position: relative;

  > div:first-child {
    position: absolute;
    width: ${props => (props.enabled ? "0" : "100%")};
    height: ${props => (props.enabled ? "0" : "100%")};
    z-index: ${props => (props.enabled ? "0" : "999")};
    background-color: ${props =>
      props.enabled ? "transparent" : "rgba(255,255,255,0.6)"};
  }
`;

export { StyledOverlay as Overlay };

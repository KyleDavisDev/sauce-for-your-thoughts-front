import * as React from "react";

interface TriggerProps {
  children:
    | string
    | Element
    | JSX.Element
    | Array<string | Element | JSX.Element>;
  className?: string;
}

const Trigger: React.SFC<TriggerProps> = props => {
  return <a className={props.className}>{props.children}</a>;
};
Trigger.displayName = "Trigger";

export default Trigger;

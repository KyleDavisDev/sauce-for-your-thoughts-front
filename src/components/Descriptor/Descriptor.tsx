import * as React from "react";

interface DescriptorProps {
  className?: string;
  children: string;
  title: string;
}

const Descriptor: React.SFC<DescriptorProps> = props => {
  return (
    <div className={props.className}>
      <h5>{props.title}</h5>
      <p>{props.children}</p>
    </div>
  );
};

export default Descriptor;

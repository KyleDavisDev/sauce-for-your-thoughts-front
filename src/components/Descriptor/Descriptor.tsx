import * as React from "react";

interface DescriptorProps {
  className?: string;
  children: string;
  title: string;
}

const Descriptor: React.SFC<DescriptorProps> = props => {
  return (
    <div className={props.className}>
      <h2>{props.title}</h2>
      <p>{props.children}</p>
    </div>
  );
};

export default Descriptor;

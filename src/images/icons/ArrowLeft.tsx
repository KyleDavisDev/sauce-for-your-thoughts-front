import * as React from "react";

interface ArrowLeftProps {}

const ArrowLeft: React.SFC<ArrowLeftProps> = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 63 32"
      transform="rotate(180)"
    >
      <path d="M61.5 13.7L48.8 1c-1.2-1.2-3.1-1.2-4.2 0-1.2 1.2-1.2 3.1 0 4.2l7.8 7.8H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h49l-7.4 7.4c-1.2 1.2-1.2 3.1 0 4.2 1.2 1.2 3.1 1.2 4.2 0l12.7-12.7c.6-.5.9-1.3.9-2.1s-.3-1.5-.9-2.1z" />
    </svg>
  );
};

export default ArrowLeft;

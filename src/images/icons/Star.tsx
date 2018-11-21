import React from "react";

const Star = ({
  height,
  className
}: {
  height?: number;
  className?: string;
}) => (
  <svg
    width={height}
    height={height}
    className={className}
    viewBox="0 0 500 500"
  >
    <g transform="matrix(1,0,0,1,51.9678,93.7364)">
      <path
        d="M198.032,-70.062L254.21,102.835L436.005,102.835L288.93,209.692L345.108,382.589L198.032,275.733L50.957,382.589L107.135,209.692L-39.941,102.835L141.854,102.835L198.032,-70.062Z"
        className="center"
      />
      <path
        d="M254.21,102.835L436.005,102.835L288.93,209.692L345.108,382.589L198.032,275.733L50.957,382.589L107.135,209.692L-39.941,102.835L141.854,102.835L198.032,-70.062L254.21,102.835ZM160.018,127.835L37.001,127.835L136.524,200.143L98.51,317.139L198.032,244.831L297.555,317.139L259.541,200.143L359.063,127.835L236.046,127.835L198.032,10.84L160.018,127.835Z"
        className="border"
      />
    </g>
  </svg>
);
Star.defaultProps = {
  height: 50,
  className: "star"
};

export default Star;

import React from "react";
import PropTypes from "prop-types";

const FormLeft = ({ title, desc }) => (
  <div>
    <h4>{title}</h4>
    <span>{desc}</span>
  </div>
);
FormLeft.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
};

export default FormLeft;

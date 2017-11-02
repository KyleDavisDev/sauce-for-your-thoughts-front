import React from "react";
import PropTypes from "prop-types";

const TextInput = props => {
  return (
    <div>
      <label htmlFor={props.name}> {props.name}: </label>
      <input
        type={props.type || "text"}
        id={props.id || ""}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        required={props.required || false}
      />
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string
};

export default TextInput;

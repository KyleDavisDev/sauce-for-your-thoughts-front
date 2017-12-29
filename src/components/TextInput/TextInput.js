import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ id, name, onChange, required, type, value, placeholder }) => {
  return (
    <div>
      <label htmlFor={name}> {name}: </label>
      <input
        type={type || "text"}
        id={id || ""}
        name={name}
        value={value}
        placeholder={placeholder || ""}
        onChange={onChange}
        required={required || false}
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
  value: PropTypes.string,
  placeholder: PropTypes.string
};

export default TextInput;

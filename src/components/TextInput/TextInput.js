import React from "react";
import PropTypes from "prop-types";

const TextInput = ({
  id,
  name,
  onChange,
  required,
  type,
  value,
  placeholder
}) => (
  <div>
    <label htmlFor={name} className="text__upper text__grey">
      {name}
      {required && "*"}
    </label>
    {type.toLowerCase() === "textarea" ? (
      <textarea
        id={id}
        name={name}
        cols="30"
        rows="10"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    )}
  </div>
);

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string
};

TextInput.defaultProps = {
  id: "",
  required: false,
  type: "text",
  value: "",
  placeholder: ""
};

export default TextInput;

import React from "react";
import PropTypes from "prop-types";

class TextInput extends React.Component {
  static propTypes = {
    displayName: PropTypes.bool,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    parentRef: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
  static defaultProps = {
    displayName: true,
    parentRef: () => {},
    placeholder: "",
    required: false,
    type: "text",
    value: ""
  };
  render() {
    const {
      id,
      name,
      onChange,
      required,
      type,
      value,
      placeholder,
      parentRef,
      displayName
    } = this.props;

    return (
      <div>
        {displayName && (
          <label htmlFor={name} className="text__upper text__grey">
            {name}
            {required && "*"}
          </label>
        )}
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
            ref={parentRef}
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
            ref={parentRef}
          />
        )}
      </div>
    );
  }
}

export default TextInput;

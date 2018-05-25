import React from "react";
import PropTypes from "prop-types";

class TextInput extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    parentRef: PropTypes.func
  };
  static defaultProps = {
    required: false,
    type: "text",
    value: "",
    placeholder: "",
    parentRef: () => {}
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
      parentRef
    } = this.props;

    return (
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

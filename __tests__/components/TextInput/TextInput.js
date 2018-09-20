import React from "react";
import PropTypes from "prop-types";

class TextInput extends React.Component {
  static propTypes = {
    displayTitle: PropTypes.bool,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    parentRef: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    title: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
  static defaultProps = {
    displayTitle: true,
    parentRef: () => {},
    placeholder: "",
    required: false,
    title: "",
    type: "text",
    value: ""
  };
  render() {
    const {
      displayTitle,
      id,
      name,
      onChange,
      parentRef,
      placeholder,
      required,
      title,
      type,
      value
    } = this.props;

    return (
      <div>
        {displayTitle && (
          <label htmlFor={id} className="text__upper text__grey">
            {title}
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

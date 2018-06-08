import React from "react";
import PropTypes from "prop-types";

import TextInput from "../../../../../../components/TextInput/TextInput";
import Rating from "../../../../../../components/Rating/Rating";

class FormRatingRight extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.shape({
      rating: PropTypes.number.isRequired,
      txt: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.shape({
      txt: PropTypes.string,
      ratting: PropTypes.string
    }),
    parentRefRating: PropTypes.func,
    parentRefTextArea: PropTypes.func
  };

  static defaultProps = {
    errors: null,
    parentRefRating: () => {},
    parentRefTextArea: () => {}
  };

  render() {
    const {
      data,
      name,
      onClick,
      errors,
      onChange,
      parentRefRating,
      parentRefTextArea
    } = this.props;

    return (
      <div className="container__input__full">
        <span className="text__upper text__grey w--100 d--block">
          {`${name} rating*`}
        </span>
        <div className="rating">
          <Rating
            id={`${name}__rating`}
            onClick={onClick}
            value={data.rating}
            name={name}
            showHelper={true}
            parentRef={parentRefRating}
          />

          {/* Error message */}
          {errors &&
            errors.rating && <p className="form-error">{errors.rating}</p>}
        </div>
        <TextInput
          id={`${name}__textarea`}
          name={name}
          title="description"
          type="textarea"
          onChange={onChange}
          value={data.txt}
          required={true}
          parentRef={parentRefTextArea}
        />

        {/* Error message */}
        {errors && errors.txt && <p className="form-error">{errors.txt}</p>}
      </div>
    );
  }
}

export default FormRatingRight;

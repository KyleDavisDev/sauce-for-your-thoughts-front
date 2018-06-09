import React from "react";
import PropTypes from "prop-types";

import TextInput from "../../../../../../components/TextInput/TextInput";
import Rating from "../../../../../../components/Rating/Rating";

class FormRatingRight extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.shape({
      rating: PropTypes.number,
      txt: PropTypes.string.isRequired
    }).isRequired,
    displayRating: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.shape({
      txt: PropTypes.string,
      ratting: PropTypes.string
    }),
    parentRefRating: PropTypes.func,
    parentRefTextArea: PropTypes.func,
    required: PropTypes.bool
  };

  static defaultProps = {
    displayRating: true,
    errors: null,
    parentRefRating: () => {},
    parentRefTextArea: () => {},
    required: true
  };

  render() {
    const {
      data,
      displayRating,
      errors,
      name,
      onClick,
      onChange,
      parentRefRating,
      parentRefTextArea,
      required
    } = this.props;

    return (
      <div className="container__input__full">
        {displayRating && (
          <div>
            <span className="text__upper text__grey w--100 d--block">
              {`${name} rating*`}
            </span>

            <div className="rating">
              <Rating
                id={`${name}__rating`}
                onClick={onClick}
                value={data.rating || 0}
                name={name}
                showHelper={true}
                parentRef={parentRefRating}
              />
              {/* Error message */}
              {errors &&
                errors.rating && <p className="form-error">{errors.rating}</p>}
            </div>
          </div>
        )}
        <TextInput
          id={`${name}__textarea`}
          name={name}
          title="description"
          type="textarea"
          onChange={onChange}
          value={data.txt}
          required={required}
          parentRef={parentRefTextArea}
        />

        {/* Error message */}
        {errors && errors.txt && <p className="form-error">{errors.txt}</p>}
      </div>
    );
  }
}

export default FormRatingRight;

import React from "react";
import PropTypes from "prop-types";

const CheckBoxList = ({ tags, onChange, name }) => (
  <ul className="tags">
    {tags.map(tag => (
      <div key={tag._id} className="tag tag-choice">
        <input
          type="checkbox"
          id={tag._id}
          name={name || tag.name}
          value={tag.name}
          checked={tag.isChecked}
          onChange={onChange}
        />
        <label htmlFor={tag._id}>{tag.name}</label>
      </div>
    ))}
  </ul>
);
CheckBoxList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string
};
CheckBoxList.defaultProps = {
  name: null
};

export default CheckBoxList;

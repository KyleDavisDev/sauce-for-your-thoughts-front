import React from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

const CheckBoxList = ({ tags, onChange, name }) => (
  <ul className="tags">
    {tags.map(tag => {
      const _id = tag._id || shortid.generate();
      const isChecked = tag.isChecked || false;
      return (
        <div key={_id} className="tag tag-choice">
          <input
            type="checkbox"
            id={_id}
            name={name || tag.name}
            value={tag.name}
            checked={isChecked}
            onChange={onChange}
          />
          <label htmlFor={_id}>{tag.name}</label>
        </div>
      );
    })}
  </ul>
);
CheckBoxList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string,
      isChecked: PropTypes.bool
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string
};
CheckBoxList.defaultProps = {
  name: null
};

export default CheckBoxList;

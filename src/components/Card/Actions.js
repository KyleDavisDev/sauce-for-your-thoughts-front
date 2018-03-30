import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Pencil from "../../images/icons/Pencil.js";
import { Heart, FilledHeart } from "../../images/icons/Heart";

const Actions = props => {
  const { sauce, user } = props;
  return (
    <div className="card--actions">
      {sauce &&
        user &&
        sauce.author._id === user._id && (
          <div className="card--action card--action__edit">
            <Link to={`/sauce/${sauce._id}/edit`}>
              <Pencil />
            </Link>
          </div>
        )}
      <div className="card--action card--action__heart">
        {/* {handleHeartIcon()} */}
      </div>
    </div>
  );

  // only render appropriate heart icon if displayHeartIcon is true
  // function declaration so we can write it below our 'render' and it will still be hoisted
  function handleHeartIcon() {
    if (!displayHeartIcon) return;
    {
      return heart ? (
        <button
          onClick={e => toggleSauce(ID)}
          className="button--action__active"
        >
          <FilledHeart />
        </button>
      ) : (
        <button
          onClick={e => toggleSauce(ID)}
          className="button--action__inactive"
        >
          <Heart />
        </button>
      );
    }
  }
};

Actions.propTypes = {
  sauce: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired
};

// TODO: See if assigning temp value here is anti-pattern
const mapStateToProps = state => ({
  user: { _id: state.users.self._id || "" }
});

export default connect(mapStateToProps, {})(Actions);

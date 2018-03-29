import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Pencil from "../../images/icons/Pencil.js";

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

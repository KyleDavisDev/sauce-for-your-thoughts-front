import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Pencil from "../../images/icons/Pencil.js";

const Actions = props => {
  const { sauce, author } = props;
  return (
    <div className="card--actions">
      {sauce &&
        author &&
        sauce.author._id === author._id && (
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
    _id: PropTypes.string.isRequired
  }).isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = (state, ownProps) => ({
  author: state.users.byId[state.sauces.byId[ownProps._id].author._id] || {
    _id: ""
  }
});

export default connect(mapStateToProps, {})(Actions);

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ComingSoon from "../../images/photos/ComingSoon.png";

import { host } from "../../utils/api/api";
import Actions from "./components/actions/Actions";

const Card = props => {
  const { sauce } = props;
  const photo = sauce.photo || "ComingSoon.png";

  return (
    <div className="card">
      <div className="card-hero">
        <Actions sauce={sauce} />
        <img
          src={`${host}/public/uploads/${photo}`}
          onError={e => (e.target.src = ComingSoon)}
          title={sauce.name}
          alt={sauce.name}
        />
        <div className="sauce-title">
          <Link to={`/sauce/single/${sauce.slug}`}>{sauce.name}</Link>
        </div>
      </div>
      <div className="card-details">
        {/* {limit description to 25 words } */}
        <p>
          {sauce.description
            .split(" ")
            .slice(0, 25)
            .join(" ")}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  sauce: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    photo: PropTypes.string,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.shape({ _id: PropTypes.string.isRequired })
  }).isRequired
};

// TODO figure out how to access author ID before redux sets users
const mapStateToProps = (state, ownProps) => ({
  user: { token: state.users.self.token },
  sauce: state.sauces.byId[ownProps._id]
});

export default connect(mapStateToProps, {})(Card);

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FillerImage from "../../images/photos/sauce.jpg";
import { Heart, FilledHeart } from "../../images/icons/Heart";
import { host } from "../../api/api";
import Actions from "./Actions";

const index = props => {
  const { sauce, reviews } = props;

  return (
    <div className="card">
      <div className="card-hero">
        <Actions sauce={sauce} />
        <img
          src={FillerImage}
          onError={e => (e.target.src = FillerImage)}
          onLoad={e => (e.target.src = `${host}/public/uploads/${sauce.photo}`)}
          title={sauce.name}
          alt={sauce.name}
        />
        <div className="sauce-title">
          <Link to={`/sauce/${sauce.slug}`}>{sauce.name}</Link>
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

index.propTypes = {
  sauce: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.shape({ _id: PropTypes.string.isRequired })
  }).isRequired

  // _id: PropTypes.string.isRequired
  // displayHeartIcon: PropTypes.bool.isRequired,
  // heart: PropTypes.bool.isRequired,
  // toggleSauce: PropTypes.func.isRequired
};

// TODO figure out how to access author ID before redux sets users
const mapStateToProps = (state, ownProps) => ({
  user: { token: state.users.self.token },
  sauce: state.sauces.byId[ownProps._id]
  // reviews: {}
});

export default connect(mapStateToProps, {})(index);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SingleHero from "./components/singleHero/SingleHero";
import SubmitReview from "./components/submitReview/SubmitReview";
import UserReview from "./components/userReview/UserReview";

import { getSauceBySlug } from "../../../../redux/actions/sauces";

const GenerateTagsList = ({ tags }) => (
  <ul className="tags">
    {tags.map(tag => (
      <li className="tag" key={tag}>
        <Link to={`/tags/${tag}`} className="tag-link">
          <span className="tag-text">#{tag}</span>
        </Link>
      </li>
    ))}
  </ul>
);
GenerateTagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

class SauceSingle extends Component {
  static propTypes = {
    sauce: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      photo: PropTypes.string,
      slug: PropTypes.string.isRequired
    }),
    user: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        sauce: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
        author: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired
      }).isRequired
    ).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        slug: PropTypes.string
      }).isRequired
    }).isRequired,
    getSauceBySlug: PropTypes.func.isRequired
  };

  static defaultProps = {
    sauce: {
      _id: "",
      slug: "",
      author: { _id: "", name: "" },
      name: "",
      maker: "",
      shu: 0,
      types: [],
      peppers: [],
      location: { state: "", city: "", country: "" },
      reviews: [],
      description: "",
      photo: ""
    }
  };

  componentDidMount() {
    // save API call if we already have sauce and reviews in redux store
    if (
      (this.props.sauce && this.props.sauce._id.length === 0) ||
      this.props.reviews.length === 0
    ) {
      const { slug } = this.props.match.params;
      this.getSauceBySlug({ slug });
    }
  }

  render() {
    const { sauce } = this.props;

    return (
      <div className="inner">
        <div className="single">
          <SingleHero sauce={sauce} />
        </div>

        {/* <div className="single--details"> */}
        {/* description & tags */}
        {sauce &&
          false &&
          Object.keys(sauce).length > 0 && (
            <div className="inner">
              <p>{sauce.description}</p>
              {/* {sauce.tags.length > 0 && (
                <GenerateTagsList tags={sauce.tags} />
              )} */}
            </div>
          )}

        {/* Add review */}
        {/* {sauce &&
            Object.keys(sauce).length > 0 &&
            this.props.user.token && <SubmitReview sauceID={sauce._id} />} */}

        {/* All of the user reviews */}
        {/* <div className="reviews">
            {this.props.reviews &&
              this.props.reviews.length > 0 &&
              this.props.reviews.map(review => (
                <UserReview _id={review._id} key={review._id} />
              ))}
          </div> */}
        {/* </div> */}
      </div>
    );
  }

  getSauceBySlug = ({ slug }) => {
    this.props.getSauceBySlug(slug).catch(err => {
      console.log(err);
    });
  };
}

// TODO figure out better way to organize this
const mapStateToProps = (state, ownProps) => {
  // get the ID of the sauce that matches the page slug
  const sauceID =
    state.sauces.allIds.length > 0 && //
    Object.keys(state.sauces.byId).length > 0 && // This should definitely pass if the above passed
    state.sauces.allIds.find(
      // Find the sauce with the matching slug
      x => state.sauces.byId[x].slug === ownProps.match.params.slug
    );

  // init reviews
  const reviews = sauceID ? state.sauces.byId[sauceID].reviews : [];

  const sauce = sauceID // find specific sauce or set default values
    ? state.sauces.byId[sauceID]
    : null;

  const user = {
    token: state.users.self.token || ""
  };

  return {
    user,
    sauce,
    reviews
  };
};

const mapDispatchToProps = {
  getSauceBySlug
};

export default connect(mapStateToProps, mapDispatchToProps)(SauceSingle);

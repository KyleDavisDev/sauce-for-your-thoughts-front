import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addReview } from "../../redux/actions/reviews";
import Rating from "../Rating/Rating";
import Auth from "../../Helper/Auth/Auth";

class SubmitReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        descriptions: "",
        stars: 0
      },
      errors: { description: "", stars: "" }
    };
  }

  render() {
    const { description, stars } = this.state.data;
    return this.props.user.token ? (
      <form onSubmit={this.onSubmit} className="reviewer">
        <textarea
          id="description"
          name="description"
          cols="30"
          rows="10"
          onChange={this.onChange}
          value={description}
          placeholder="Did you try this sauce? Have something to say? Leave a review..."
        />
        <div className="reviewer__actions">
          <div className="reviewer__stars">
            <Rating rating={stars} onClick={this.onRatingClick} height={25} />
          </div>
          <div className="reviewer__submit">
            <button type="submit" className="button button--submit">
              Submit Review ->
            </button>
          </div>
        </div>
      </form>
    ) : null;
  }

  onSubmit = e => {
    e.preventDefault();

    // make sure token is still legit
    // 1. make sure user exists in props
    // 2. make sure token exists in user
    // 3. make sure token is not empty
    // 4. make sure token is still legit
    // TODO: Determine if this is massive overkill.
    if (
      !this.props.user ||
      !this.props.user.token ||
      this.props.user.token.length === 0 ||
      !Auth.isUserAuthenticated(this.props.user.token)
    ) {
    }

    // construct our API object
    const data = {
      user: { token: this.props.user.token },
      review: {
        text: this.state.data.description,
        rating: this.state.data.stars
      },
      sauce: { _id: this.props.sauceID }
    };
    this.props
      .addReview(data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  onRatingClick = val => {
    this.setState({ ...this.state, data: { ...this.state.data, stars: val } });
  };

  onChange = e => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name.toLowerCase()]: e.target.value
      }
    });
  };
}
SubmitReview.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string.isRequired
  }),
  sauceID: PropTypes.string.isRequired,
  addReview: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: {
    token: state.users.self.token
  }
});

const mapDispatchToProps = {
  addReview
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitReview);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addReview } from "../../redux/actions/reviews";
import Auth from "../../Helper/Auth/Auth";

import ReviewForm from "./ReviewForm";

class Add extends Component {
  static propTypes = {
    user: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired,
    // addSauce: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    addReview: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (!this.props.user.token) this.props.history.push("/login");
  }

  render() {
    return (
      <div className="inner">
        <h2>Add Sauce</h2>

        <ReviewForm onSubmit={this.onSubmit} />
        <div className="spacer" />
      </div>
    );
  }

  /** @description This creates a formData object to pass to the API
   *  @param {Object} payload - payload obj
   *    @param {String} payload.taste - taste obj
   *      @param {String} payload.taste.txt - description of taste
   *      @param {Number} payload.taste.rating - 1-5 rating
   *    @param {String} payload.heat - heat obj
   *      @param {String} payload.heat.txt - description of heat
   *      @param {Number} payload.heat.rating - 1-5 rating
   *    @param {String} payload.aroma - aroma obj
   *      @param {String} payload.aroma.txt - description of aroma
   *      @param {Number} payload.aroma.rating - 1-5 rating
   *    @param {String} payload.overall - overall obj
   *      @param {String} payload.overall.txt - description of overall
   *      @param {Number} payload.overall.rating - 1-5 rating
   *    @param {String} payload.label - label obj
   *      @param {String} payload.label.txt - description of label
   *      @param {Number} payload.label.rating - 1-5 rating
   *    @param {String?} payload.note - who made the sauce
   */
  onSubmit = ({ payload }) => {
    // make sure token is still good/not expired
    if (!Auth.isUserAuthenticated()) this.props.history.push("/login");

    // Construct the data obj
    const data = {
      review: payload,
      user: {
        token: this.props.user.token
      },
      sauce: {
        slug: this.props.match.params.slug
      }
    };

    this.props
      .addReview(data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
}

function mapStateToProps(state) {
  return {
    user: { token: state.users.self.token || "" }
  };
}

const mapDispatchToProps = { addReview };

export default connect(mapStateToProps, mapDispatchToProps)(Add);

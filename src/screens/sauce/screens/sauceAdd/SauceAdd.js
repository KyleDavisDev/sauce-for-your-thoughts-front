import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SauceAddForm from "./components/sauceAddForm/SauceAddForm";

import { addSauce } from "../../../../redux/actions/sauces";
import Auth from "../../../../utils/auth/Auth";

class SauceAdd extends Component {
  static propTypes = {
    user: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired,
    addSauce: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  componentDidMount() {
    if (!this.props.user.token) this.props.history.push("/login");
  }

  render() {
    return (
      <div className="inner">
        <h2>Add Sauce</h2>

        <SauceAddForm onSubmit={this.handleAddSauceSubmit} />
        <div className="spacer" />
      </div>
    );
  }

  /** @description This creates a formData object to pass to the API
   *  @param {Object} payload - passed from Form
   *    @param {String} payload.name - name of sauce
   *    @param {String} payload.maker - who made the sauce
   *    @param {String} payload.description - maker's description of the sauce
   *    @param {String?} payload.ingredients - ingredients of sauce
   *    @param {Number?} payload.shu - spiciness in Scoville Heat Unit
   *    @param {Object[]} payload.peppers[] - Primary peppers in sauce
   *      @param {String} payload.peppers[].name - pepper name
   *      @param {Bool} payload.peppers[].isChecked - whether pepper is in sauce or not
   *    @param {Object[]} payload.types[] - Primary peppers in sauce
   *      @param {String} payload.types[].name - pepper name
   *      @param {Bool} payload.types[].isChecked - whether pepper is in sauce or not
   *    @param {Object} payload.location - location object
   *      @param {Object?} payload.location.country - country sauce was made
   *      @param {Object?} payload.location.state - state/region sauce was made
   *      @param {Object?} payload.location.city - city sauce was made
   *    @param {Object} payload.photo - photo object
   *      @param {String} payload.photo.name - name of picture
   *      @param {File} payload.photo.file - picture file
   *  @param {Bool} addReview - does user want to add a review or not?
   */
  handleAddSauceSubmit = (payload, addReview) => {
    // Get array of checked peppers
    const peppers = payload.peppers
      .filter(pepper => pepper.isChecked)
      .map(pepper => pepper.name);

    // Get array of checked types
    const types = payload.types
      .filter(type => type.isChecked)
      .map(type => type.name);

    // make sure token is still good/not expired
    if (!Auth.isUserAuthenticated()) this.props.history.push("/login");

    const { name, maker, description, ingredients, shu, location } = payload;

    // construct FormData object since we are passing image file
    const data = JSON.stringify({
      sauce: {
        name,
        maker,
        description,
        ingredients,
        shu,
        location,
        peppers,
        types
      },
      user: {
        token: this.props.user.token
      }
    });

    const formData = new FormData();
    formData.append("data", data);
    formData.append("image", payload.photo.file);

    this.props
      .addSauce(formData)
      .then(res => {
        // Go to sauce page if they do not want to add a review
        if (addReview === false)
          this.props.history.push(`/sauce/${res.data.sauces[0].slug}`);

        // Go to review page for specific sauce
        this.props.history.push(`/review/add/${res.data.sauces[0].slug}`);
      })
      .catch(err => {
        // TODO better error handling
      });
  };
}

function mapStateToProps(state) {
  return {
    user: { token: state.users.self.token || "" }
  };
}

const mapDispatchToProps = {
  addSauce
};

export default connect(mapStateToProps, mapDispatchToProps)(SauceAdd);

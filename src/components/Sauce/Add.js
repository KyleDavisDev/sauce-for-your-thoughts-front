import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addSauce } from "../../redux/actions/sauce";
import Auth from "../../Helper/Auth/Auth";

import Form from "./Form";

class Add extends Component {
  componentWillMount() {
    if (!this.props.user.token) this.props.history.push("/login");
  }

  componentDidMount() {
    if (!this.props.user.token) return;
  }

  render() {
    return (
      <div className="inner">
        <h2>Add Sauce</h2>
        <Form onSubmit={this.handleFormSubmit} />
      </div>
    );
  }

  handleFormSubmit = e => {
    //make tags an array of checked tags
    const tags = e.tags.filter(tag => tag.isChecked).map(tag => tag.name);

    //make sure token is still good/not expired
    if (!Auth.isUserAuthenticated()) this.props.history.push("/login");

    //construct FormData object since we are passing image file
    const data = JSON.stringify({
      sauce: {
        name: e.name,
        description: e.description,
        tags
      },
      review: {
        rating: e.rating
      },
      user: {
        token: this.props.user.token
      }
    });

    const formData = new FormData();
    formData.append("data", data);
    formData.append("image", e.photo.file);

    this.props
      .addSauce(formData)
      .then(res => {
        this.props.history.push(`/sauce/${res.data.sauce.slug}`);
      })
      .catch(err => {
        //TODO: Better error handling
        console.log(err.response);
        console.log(err.response.msg);
      });
  };
}

Add.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string
  }),
  addSauce: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: { token: state.user.token }
  };
}
export default connect(mapStateToProps, { addSauce })(Add);

import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addSauce } from "../../redux/actions/sauce";

import Form from "./AddEditForm";

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

  handleFormSubmit = data => {
    //make tags an array of checked tags
    const tags = data.tags.filter(tag => tag.isChecked).map(tag => tag.name);

    //construct FormData object since we are passing image file
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.photo.file);
    formData.append("tags", tags);
    formData.append("token", this.props.user.token);

    this.props
      .addSauce(formData)
      .then(res => {
        this.props.history.push(`/sauce/${res.slug}`);
      })
      .catch(err => console.log(err.response.msg));
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

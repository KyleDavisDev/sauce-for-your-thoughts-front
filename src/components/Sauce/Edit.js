import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInfo as getUserInfo } from "../../redux/actions/user";
import { getSauceById, updateSauce } from "../../redux/actions/sauce";
import { flashError } from "../../redux/actions/flash";

import Form from "./Form";

class Edit extends Component {
  componentWillMount() {
    if (!this.props.user.token) this.props.history.push("/login");
  }

  componentDidMount() {
    if (!this.props.user.token) return;
    axios.all([this.getSauceById(), this.getUserInfo()]).catch(error => {
      console.log(error);
      // this.props.flashError({ text: error.response.data.msg });
    });
  }

  render() {
    const {
      name = "",
      description = "",
      photo = "",
      tags = [],
      rating = 0
    } = this.props.sauce;
    console.log(this.props.sauce);
    return (
      <div className="inner">
        <h2>Edit {name || "Sauce"}</h2>
        {Object.keys(this.props.sauce).length > 0 && (
          <Form
            onSubmit={this.handleSubmit}
            name={name}
            description={description}
            photo={photo}
            tags={tags}
            rating={rating}
          />
        )}
      </div>
    );
  }

  //get information about user
  getUserInfo = () => {
    //check if email already passed to component to save api call
    if (this.props.user.email) return;
    const data = { user: { token: this.props.user.token } };
    return this.props.getUserInfo(data);
  };

  //get single sauce information
  //must pass user token and ID we are looking for
  getSauceById = () => {
    const data = {
      user: { token: this.props.user.token },
      sauce: { _id: this.props.match.params.id }
    };
    return this.props.getSauceById(data);
  };

  handleSubmit = e => {
    //make tags an array of checked tags
    const tags = data.tags.filter(tag => tag.isChecked).map(tag => tag.name);

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
      .updateSauce(formData)
      .then(res => {
        this.props.history.push(`/sauce/${res.sauce.slug}`);
      })
      .catch(err => console.log(err));
  };
}

Edit.propTypes = {
  user: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  sauce: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    slug: PropTypes.string
  }),
  getSauceById: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  flashError: PropTypes.func.isRequired,
  updateSauce: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: { token: state.user.token, email: state.user.email },
    sauce: state.sauce
  };
};

const mapDispatchToProps = {
  getSauceById,
  getUserInfo,
  flashError,
  updateSauce
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

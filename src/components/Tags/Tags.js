import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInfo } from "../../actions/user";
import { getStoresByTag as getStores } from "../../actions/sauces";
import { flashError } from "../../actions/flash";
import { getTagsList } from "../../actions/tags";

import Card from "../Store/Card.js";

import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker.js";

const Title = ({ title }) => {
  return <h2>{title}</h2>;
};
Title.proptypes = {
  title: PropTypes.string.isRequired
};

const StoresList = ({ stores, email }) => {
  return (
    <div className="stores">
      {stores.map(store => {
        return (
          <Card
            displayEditIcon={email === store.author}
            ID={store._id}
            name={store.name}
            image={store.photo}
            slug={store.slug}
            description={store.description}
            key={store.slug}
          />
        );
      })}
    </div>
  );
};
StoresList.proptypes = {
  stores: PropTypes.arrayOf([
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf([PropTypes.string]).isRequired,
      location: PropTypes.shape({
        address: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf([PropTypes.number.isRequired]).isRequired
      }).isRequired
    }).isRequired
  ]).isRequired
};

const TagsList = ({ tags }) => {
  return (
    <ul className="tags">
      {tags.map(tag => {
        return (
          <li key={tag._id} className="tag">
            <NavLink
              activeClassName="tag-link-active"
              to={`/tags/${tag._id}`}
              className="tag-link"
            >
              <span className="tag-text">{tag._id}</span>
              <span className="tag-count">{tag.count}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
TagsList.proptypes = {
  tags: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }).isRequired
};

class Tags extends Component {
  componentDidMount() {
    const tag = this.props.match.params.tag || "All";

    axios
      .all([this.getStores(tag), this.getUserInfo(), this.getTagsList()])
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    const tag = nextProps.match.params.tag;
    if (tag && tag !== this.props.match.params.tag) {
      this.getStores(tag);
    }
  }

  render() {
    const title = this.props.match.params.tag || "Tags";
    const { tags = [], stores = [] } = this.props;
    // const stores = this.props.stores || [];
    const { email } = this.props.user || "";
    return (
      <div className="inner">
        <Title title={title} />
        {tags.length > 0 && <TagsList tags={tags} />}
        {stores.length > 0 && <StoresList stores={stores} email={email} />}
      </div>
    );
  }

  getStores = tag => {
    //Sanity check for bogus tag values
    // if (!Object.keys(this.props.tags).includes(tag)) return;

    return this.props.getStores(tag);
  };

  getUserInfo = () => {
    //check if email already passed to component to save api call
    if (this.props.user.email) return;
    const data = { token: this.props.user.token };
    return this.props.getInfo(data);
  };

  getTagsList = () => {
    return this.props.getTagsList();
  };
}

const mapStateToProps = state => {
  return {
    stores: state.stores,
    user: {
      token: state.user.token,
      email: state.user.email
    },
    tags: state.tags
  };
};

const mapDispatchToProps = {
  flashError,
  getStores,
  getInfo,
  getTagsList
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Tags);

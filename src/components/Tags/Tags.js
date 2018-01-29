import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInfo, heartSauce, unHeartSauce } from "../../actions/user";
import { getSaucesByTag } from "../../actions/sauces";
import { flashError } from "../../actions/flash";
import { getTagsList } from "../../actions/tags";
import Card from "../Sauce/Card.js";

const Title = ({ title }) => {
  return <h2>{title}</h2>;
};
Title.proptypes = {
  title: PropTypes.string.isRequired
};

const Cards = ({ sauces, email, heartSauce, unHeartSauce }) => {
  return (
    <div className="sauces">
      {sauces.map(sauce => {
        return (
          <Card
            displayEditIcon={email === sauce.author ? true : false}
            heart={sauce.heart}
            heartSauce={heartSauce}
            unHeartSauce={unHeartSauce}
            ID={sauce._id}
            name={sauce.name}
            image={sauce.photo}
            slug={sauce.slug}
            description={sauce.description}
            key={sauce.slug}
          />
        );
      })}
    </div>
  );
};
Cards.proptypes = {
  sauces: PropTypes.arrayOf([
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf([PropTypes.string]).isRequired
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
      .all([this.getSaucesByTag(tag), this.getTagsList()])
      .catch(err => console.log(err.response));
  }

  componentWillReceiveProps(nextProps) {
    const tag = nextProps.match.params.tag;
    if (tag && tag !== this.props.match.params.tag) {
      this.getSaucesByTag(tag);
    }
  }

  render() {
    const title = this.props.match.params.tag || "Tags";
    const { tags = [], sauces = [] } = this.props;
    // const sauces = this.props.sauces || [];
    const { email } = this.props.user || "";
    return (
      <div className="inner">
        <Title title={title} />
        {tags.length > 0 && <TagsList tags={tags} />}
        {sauces.length > 0 && (
          <Cards
            sauces={sauces}
            email={email}
            heartSauce={this.heartSauce}
            unHeartSauce={this.unHeartSauce}
          />
        )}
      </div>
    );
  }

  getSaucesByTag = tag => {
    //Sanity check for bogus tag values
    // if (!Object.keys(this.props.tags).includes(tag)) return;
    const data = { token: this.props.user.token, tag };
    return this.props.getSaucesByTag(data);
  };

  //this will pass token to api and store email/name into redux store on success
  getUserInfo = () => {
    //check if email already passed to component to save api call
    if (this.props.user.email) return;
    const data = { token: this.props.user.token };

    return this.props.getInfo(data);
  };

  getTagsList = () => {
    return this.props.getTagsList();
  };

  //'like' specific sauce
  heartSauce = ID => {
    const data = { token: this.props.user.token, sauce: { _id: ID } };
    this.props.heartSauce(data).catch(err => console.log(err));
  };

  //'unlike' specific sauce
  unHeartSauce = ID => {
    const data = { token: this.props.user.token, sauce: { _id: ID } };
    this.props.unHeartSauce(data).catch(err => console.log(err));
  };
}
Tags.propTypes = {
  sauces: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  ),
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    email: PropTypes.string
  }),
  flashError: PropTypes.func.isRequired,
  getSaucesByTag: PropTypes.func.isRequired,
  getInfo: PropTypes.func.isRequired,
  getTagsList: PropTypes.func.isRequired,
  heartSauce: PropTypes.func.isRequired,
  unHeartSauce: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    sauces: state.sauces,
    user: {
      token: state.user.token,
      email: state.user.email
    },
    tags: state.tags
  };
};

const mapDispatchToProps = {
  flashError,
  getSaucesByTag,
  getInfo,
  getTagsList,
  heartSauce,
  unHeartSauce
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Tags);

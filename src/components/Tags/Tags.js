import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInfo, toggleSauce, getHearts } from "../../redux/actions/user";
import { getSaucesByTag } from "../../redux/actions/sauces";
import { flashError } from "../../redux/actions/flash";
import { getTagsList } from "../../redux/actions/tags";
import Card from "../Card/Card.js";

const Title = ({ title }) => {
  return <h2>Tags - {title}</h2>;
};
Title.proptypes = {
  title: PropTypes.string.isRequired
};

const Cards = ({ sauces, email, toggleSauce, hearts }) => {
  return (
    <div className="sauces">
      {sauces.map(sauce => {
        return (
          <Card
            displayEditIcon={email === sauce.author ? true : false}
            heart={hearts.includes(sauce._id)}
            toggleSauce={toggleSauce}
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
  sauces: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  ).isRequired,
  email: PropTypes.string.isRequired,
  heartSauce: PropTypes.func.isRequired,
  unHeartSauce: PropTypes.func.isRequired
};

const TagsList = ({ tags, count }) => {
  return (
    <ul className="tags">
      <li className="tag">
        <NavLink
          activeClassName="tag-link-active"
          to={"/tags"}
          className="tag-link"
          exact
        >
          <span className="tag-text">All</span>
          {/* <span className="tag-count">{count}</span> */}
        </NavLink>
      </li>
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
  }).isRequired,
  count: PropTypes.number.isRequired
};

class Tags extends Component {
  componentWillMount() {
    if (!this.props.user.token) this.props.history.push("/login");
  }
  componentDidMount() {
    if (!this.props.user.token) return;
    const tag = this.props.match.params.tag || "All";
    axios
      .all([
        this.getSaucesByTag(tag),
        this.getTagsList(),
        this.getUserInfo(),
        this.getHearts()
      ])
      .catch(err => console.log(err.response));
  }

  componentWillReceiveProps(nextProps) {
    const tag = nextProps.match.params.tag;
    if (tag && tag !== this.props.match.params.tag) {
      this.getSaucesByTag(tag);
    }
  }

  render() {
    const title = this.props.match.params.tag || "All";
    const { tags = [], sauces = [] } = this.props;
    const { email = [], hearts = [] } = this.props.user;
    return (
      <div className="inner">
        <Title title={title} />
        {tags.length > 0 && <TagsList tags={tags} count={sauces.length} />}
        {sauces.length > 0 && (
          <Cards
            sauces={sauces}
            email={email}
            toggleSauce={this.toggleSauce}
            hearts={hearts}
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

  getHearts = () => {
    //make sure user is logged in
    if (!this.props.user.token) return;

    const credentials = { token: this.props.user.token };
    return this.props.getHearts(credentials);
  };

  toggleSauce = ID => {
    const data = { token: this.props.user.token, sauce: { _id: ID } };
    this.props
      .toggleSauce(data)
      .catch(err => this.props.flashError({ text: err.response }));
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
    token: PropTypes.string,
    email: PropTypes.string,
    hearts: PropTypes.arrayOf(PropTypes.string.isRequired)
  }),
  flashError: PropTypes.func.isRequired,
  getSaucesByTag: PropTypes.func.isRequired,
  getInfo: PropTypes.func.isRequired,
  getTagsList: PropTypes.func.isRequired,
  toggleSauce: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    sauces: state.sauces,
    user: {
      token: state.user.token,
      email: state.user.email,
      hearts: state.user.hearts
    },
    tags: state.tags
  };
};

const mapDispatchToProps = {
  flashError,
  getSaucesByTag,
  getInfo,
  getTagsList,
  toggleSauce,
  getHearts
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Tags);

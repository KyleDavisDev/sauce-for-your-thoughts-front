import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Pencil from "../../images/icons/Pencil.js";
import { Heart, FilledHeart } from "../../images/icons/Heart";
import { toggleHeart } from "../../redux/actions/users";

class Actions extends Component {
  static propTypes = {
    sauce: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      author: PropTypes.shape({
        _id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    user: PropTypes.shape({
      token: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      hearts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    }).isRequired,
    toggleHeart: PropTypes.func.isRequired
  };

  componentDidMount() {
    // this.getHearts(this.props.user.token);
  }

  render() {
    const { sauce, user } = this.props;
    return (
      <div className="card--actions">
        {sauce &&
          user &&
          sauce.author._id === user._id && (
            <div className="card--action card--action__edit">
              <Link to={`/sauce/${sauce._id}/edit`}>
                <Pencil />
              </Link>
            </div>
          )}
        <div className="card--action card--action__heart">
          {this.handleHeartIcon(sauce._id)}
        </div>
      </div>
    );
  }

  /** @description figures out which heart icon should be loaded
   *  @param {String} _id - store identification
   *  @returns {JSX} appropriate button/heart
   */
  handleHeartIcon = _id => {
    const { hearts, token } = this.props.user;
    // sanity check -- maybe we dont show anything at all
    if (hearts === null || token === null || token.length === 0) {
      return;
    }

    // render correct heart based on hearts arr
    return hearts.includes(_id) ? (
      <button
        onClick={() => this.toggleHeart({ token, _id })}
        className="button--action__active"
      >
        <FilledHeart />
      </button>
    ) : (
      <button
        onClick={() => this.toggleHeart({ token, _id })}
        className="button--action__inactive"
      >
        <Heart />
      </button>
    );
  };

  /** @description 'heart' or 'unheart' a sauce
   *  @param {Object}
   *    @param {String} token - user to update
   *    @param {String} _id - sauce to add/remove
   *  @returns {Promise}
   *    @returns {NULL}
   */
  toggleHeart = ({ token, _id }) => {
    const data = { user: { token }, sauce: { _id } };
    this.props.toggleHeart(data).catch(err => {
      console.log(err);
      this.props.flashError({ text: err.response });
    });
  };
}

// TODO: See if assigning temp value here is anti-pattern
const mapStateToProps = state => {
  // Destructure and set default
  const { token = "", _id = "", hearts = [] } = state.users.self;
  // Return user object
  return {
    user: {
      token,
      _id,
      hearts
    }
  };
};

const mapDispatchToProps = { toggleHeart };

export default connect(mapStateToProps, mapDispatchToProps)(Actions);

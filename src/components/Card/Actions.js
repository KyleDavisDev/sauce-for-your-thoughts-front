import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Pencil from "../../images/icons/Pencil.js";
import { Heart, FilledHeart } from "../../images/icons/Heart";

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
      hearts: PropTypes.arrayOf(PropTypes.string.isRequired)
    })
  };

  static defaultProps = {
    user: { token: null, _id: null, hearts: null }
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
    if (
      this.props.user.hearts === null ||
      this.props.user.hearts.length === 0
    ) {
      return;
    }

    return this.props.user.hearts.includes(_id) ? (
      <button
        onClick={() => toggleSauce(ID)}
        className="button--action__active"
      >
        <FilledHeart />
      </button>
    ) : (
      <button
        onClick={() => toggleSauce(ID)}
        className="button--action__inactive"
      >
        <Heart />
      </button>
    );
  };

  toggleSauce = ID => {
    const data = { user: { token: this.props.user.token }, sauce: { _id: ID } };
    this.props
      .toggleSauce(data)
      .catch(err => this.props.flashError({ text: err.response }));
  };
}

// TODO: See if assigning temp value here is anti-pattern
const mapStateToProps = state => ({
  user: {
    token: state.users.self.token,
    _id: state.users.self._id || "",
    hearts: state.users.self.hearts || []
  }
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Actions);

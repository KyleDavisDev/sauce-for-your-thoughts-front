import React, { Component } from "react";
import PropTypes from "prop-types";
import Star from "../../images/icons/Star";

class Rating extends Component {
  static propTypes = {
    rating: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    height: PropTypes.number
  };

  constructor(props) {
    super(props);

    // create array of length 10, w/ each index having a <Star /> value
    this.state = {
      hold: false,
      rating: this.props.rating,
      starArray: Array(...Array(10)).map((x, ind) => {
        const classVal = ind < this.props.rating ? "filled" : "empty";
        return { logo: <Star height={this.props.height || 50} />, classVal };
      })
    };
  }

  // TODO: Clean up this mess
  componentWillReceiveProps(nextProps) {
    if (nextProps.rating === 0) return;
    console.log("nextporps", nextProps);
    console.log("ownprops", this.state);

    const rating =
      nextProps.rating === this.state.rating ? 0 : nextProps.rating;
    const hold = nextProps.rating !== this.state.rating;
    const starArray = this.state.starArray.map((x, ind) => {
      const classVal = ind < nextProps.rating ? "filled" : "empty";
      return { logo: <Star height={nextProps.height || 50} />, classVal };
    });

    console.log(rating, hold);
    console.log("____________");
    this.setState(prevState => ({
      rating,
      hold,
      starArray
    }));

    // this will reset the value next to "Rating:" in Form component
    // will also cause componentWillReiveProps to trigger again which should possibly be looked into later
    if (rating === 0) this.props.onClick(0);
  }

  render() {
    return <div className="star--container">{this.createTenStars()}</div>;
  }

  onClick = rating => {
    const curRating = this.state.rating;
    this.props.onClick(rating);
  };

  onMouseLeave = ind => {
    if (this.state.hold) return;
    this.toggleStars(0);
  };

  onMouseEnter = ind => {
    if (this.state.hold) return;
    this.toggleStars(ind);
  };

  toggleStars = ind => {
    this.setState(prevState => ({
      rating: ind,
      starArray: prevState.starArray.map((star, i) => {
        const classVal = i < ind ? "filled" : "empty";
        return { ...star, classVal };
      })
    }));
  };

  createTenStars = () =>
    this.state.starArray.map((star, ind) => (
      <button
        type="button"
        className={`star star--${star.classVal}`}
        key={ind}
        onClick={() => this.onClick(ind + 1)}
        onMouseEnter={() => this.onMouseEnter(ind)}
        onMouseLeave={() => this.onMouseLeave(ind)}
      >
        {star.logo}
      </button>
    ));
}

export default Rating;

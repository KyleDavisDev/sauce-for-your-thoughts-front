import React, { Component } from "react";
import PropTypes from "prop-types";
import Star from "../../images/icons/Star";

class Rating extends Component {
  static propTypes = {
    value: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    height: PropTypes.number,
    total: PropTypes.number
  };

  static defaultProps = {
    value: 0,
    total: 10,
    height: 50
  };

  constructor(props) {
    super(props);

    // create array of length 10, w/ each index having a <Star /> value
    this.state = {
      interacting: false
    };
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    // grab from props
    const { value, height, total } = this.props;
    // grab from state
    const { interacting } = this.state;

    // 1. init array of undefined the size of total number needed
    // 2. map over array
    const symbols = [...Array(total)].map(x => console.log("hi"));

    return <div className="star--container">yo</div>;
  }

  onClick = rating => {
    const curRating = this.state.rating;
    this.props.onClick(rating);
  };

  onMouseEnter = () => {
    this.setState({ interacting: true });
  };

  onMouseLeave = () => {
    this.setState({ interacting: false, value: this.props.value });
  };
}

export default Rating;

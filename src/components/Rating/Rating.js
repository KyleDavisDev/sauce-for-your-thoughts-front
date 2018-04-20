import React, { Component } from "react";
import PropTypes from "prop-types";
import Star from "../../images/icons/Star";

class Rating extends Component {
  static propTypes = {
    value: PropTypes.number,
    displayValue: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    height: PropTypes.number,
    total: PropTypes.number
  };

  static defaultProps = {
    value: 0,
    displayValue: 0,
    total: 10,
    height: 50
  };

  constructor(props) {
    super(props);

    // create array of length 10, w/ each index having a <Star /> value
    this.state = {
      // Indicated the 'offical' value of the component
      value: this.props.value,

      // Indicated the 'working' value of the component
      displayValue: this.props.value,
      // Indicates if the user is currently hovering over the rating element
      interacting: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const valueChanged = this.props.value !== nextProps.value;
    this.setState(prevState => ({
      // Update if component has updated even once
      dirty: valueChanged || prevState.dirty,
      // Update to newest value if different
      displayValue: valueChanged ? nextProps.value : prevState.displayValue
    }));
  }

  render() {
    // grab from props
    const { value, height, total } = this.props;
    // grab from state
    const { displayValue, interacting } = this.state;

    const renderedValue = interacting ? displayValue : value;
    console.log(renderedValue);

    // 1. init array of undefined the size of total number needed
    // 2. map over array
    const symbols = [...Array(total)].map((val, ind) => {
      const className = `star star--${
        renderedValue > ind ? "filled" : "empty"
      }`;
      return (
        <button
          type="button"
          key={ind}
          onClick={e => this.onClick(ind, e)}
          onMouseEnter={e => this.onMouseEnter(ind, e)}
          onMouseLeave={e => this.onMouseLeave(ind, e)}
        >
          <Star height={height} className={className} />
        </button>
      );
    });

    return <div className="star--container">{symbols}</div>;
  }

  onClick = (index, event) => {
    this.props.onClick(index + 1, event);
  };

  onMouseEnter = (index, event) => {
    this.setState({ interacting: true, displayValue: index });
  };

  onMouseLeave = (index, event) => {
    this.setState(prevState => ({
      interacting: false,
      displayValue: prevState.value
    }));
  };
}

export default Rating;

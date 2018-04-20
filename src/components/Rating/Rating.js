import React, { Component } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import Star from "../../images/icons/Star";

class Rating extends Component {
  static propTypes = {
    value: PropTypes.number,
    displayValue: PropTypes.number,
    total: PropTypes.number,
    height: PropTypes.number,
    readOnly: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: 0,
    displayValue: 0,
    total: 10,
    height: 50,
    readOnly: false
  };

  constructor(props) {
    super(props);

    // Set state
    this.state = {
      // Indicated the 'offical' value of the component
      value: this.props.value,
      // Indicated the 'working' value of the component
      displayValue: this.props.displayValue || this.props.value,
      // Indicates if the user is currently hovering over the rating element
      interacting: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const valueChanged = this.props.value !== nextProps.value;
    this.setState(prevState => ({
      value: valueChanged ? nextProps.value : prevState.value,
      // Update to newest value if different
      displayValue: valueChanged ? nextProps.value : prevState.displayValue
    }));
  }

  render() {
    // grab from props
    const { height, total } = this.props;
    // grab from state
    const { value, displayValue, interacting, readOnly } = this.state;

    // Figure out which value we should be displaying
    const renderedValue = interacting ? displayValue : value;

    // 1. init array of undefined the size of total number needed
    // 2. map over array
    // 3. Find appropriate class name
    // 4. Create button and assign properties
    // 5. Create Star and assign properties
    const symbols = [...Array(total)].map((val, ind) => {
      const className = `star star--${
        renderedValue > ind ? "filled" : "empty"
      }`;
      return (
        <button
          type="button"
          key={shortid.generate()}
          onClick={!readOnly ? this.onClick.bind(this, ind) : this.doNothing}
          onMouseEnter={
            !readOnly ? this.onMouseEnter.bind(this, ind) : this.doNothing
          }
          onMouseLeave={
            !readOnly ? this.onMouseLeave.bind(this, ind) : this.doNothing
          }
        >
          <Star height={height} className={className} />
        </button>
      );
    });

    return <div className="star--container">{symbols}</div>;
  }

  onClick = (index, event) => {
    // Need to add 1 to the index b/c arrays start at 0
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

  doNothing = () => {};
}

export default Rating;

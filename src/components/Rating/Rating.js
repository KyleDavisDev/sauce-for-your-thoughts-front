import React, { Component } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import Star from "../../images/icons/Star";

class Rating extends Component {
  static propTypes = {
    displayValue: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    readOnly: PropTypes.bool,
    total: PropTypes.number,
    value: PropTypes.number
  };

  static defaultProps = {
    displayValue: 0,
    height: 50,
    name: "",
    onClick() {},
    onMouseEnter() {},
    onMouseLeave() {},
    readOnly: false,
    total: 10,
    value: 0
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

  shouldComponentUpdate(nextProps, nextState) {
    // Only update if:
    // 1. The display value has been updated OR
    // 2. The component is currently being interacted with OR
    // 3. The value has been updated
    return (
      this.state.displayValue !== nextState.displayValue ||
      nextState.interacting ||
      this.props.value !== nextProps.value
    );
  }

  render() {
    // grab from props
    const { height, total, readOnly, name } = this.props;
    // grab from state
    const { value, displayValue, interacting } = this.state;

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
          disabled={readOnly}
          className={readOnly ? "disabled" : ""}
          name={name}
        >
          <Star height={height} className={className} />
        </button>
      );
    });

    return <div className="star--container">{symbols}</div>;
  }

  onClick = (index, event) => {
    this.setState({ value: index + 1 });

    // Need to add 1 to the index b/c arrays start at 0
    this.props.onClick(index + 1, event);
  };

  onMouseEnter = (index, event) => {
    // if we are in readOnly mode, then do not do anything
    if (this.props.readOnly) return;

    // Need to add 1 to the index b/c arrays start at 0
    this.setState({ interacting: true, displayValue: index + 1 });

    // Call props
    this.props.onMouseEnter(index + 1, event);
  };

  onMouseLeave = (index, event) => {
    // 'reset' local state
    this.setState(prevState => ({
      interacting: false,
      displayValue: prevState.value
    }));

    // Call props
    this.props.onMouseLeave(index + 1, event);
  };

  doNothing = () => {};
}

export default Rating;

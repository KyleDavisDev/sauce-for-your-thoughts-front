import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { connect } from "react-redux";
import { getStoresByMap as getStores } from "../../actions/stores";

class Map extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //break apart query string or return empty object if empty
    const coordinates = queryString.parse(this.props.location.search);
    this.getLocation(coordinates);
  }

  render() {
    return <div>{console.log(this.props)}</div>;
  }

  getLocation = coordinates => {
    return this.props
      .getStores(coordinates)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
}
Map.propTypes = {
  getStores: PropTypes.func.isRequired
};

export default connect(null, { getStores })(Map);

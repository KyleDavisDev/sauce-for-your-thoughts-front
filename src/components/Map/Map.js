import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { connect } from "react-redux";
import { getStoresByMap as getStores } from "../../actions/stores";
import { GenerateStaticGoogleMap } from "./GenerateMap";
import PlacesAutocomplete, {
  geocodeByAddress
} from "react-places-autocomplete";
import Validator from "validator";

import TextInput from "../TextInput/TextInput";

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        location: {
          address: "",
          latitude: "",
          longitude: ""
        }
      }
    };
  }

  componentDidMount() {
    //break apart query string or return empty object if empty
    const coordinates = queryString.parse(this.props.location.search);
    console.log(coordinates);
    console.log(Validator.isNumeric(coordinates.lng));

    //make sure coordinates is not empty
    //make sure .lng is string and not empty
    //make sure .lat is string and not empty
    if (
      Object.keys(coordinates).length > 0 &&
      Validator.isInt(coordinates.lng, { min: -180, max: 180 }) &&
      coordinates.lng.trim().length > 0 &&
      Validator.isInt(coordinates.lat, { min: -85, max: 85 }) &&
      coordinates.lat.trim().length > 0
    ) {
      this.getLocation(coordinates);
    }
  }

  render() {
    const { address, longitude, latitude } = this.state.data.location;
    return (
      <div className="inner">
        <h2>Map</h2>
        <div className="map">
          <div className="autocomplete">
            <PlacesAutocomplete
              inputProps={{
                value: address,
                onChange: this.onChangeAddress,
                placeholder: "Search Places..."
              }}
              id="address"
              name="address"
              onSelect={this.onAddressSelect}
              classNames={{ autocompleteContainer: "places" }}
              placeholder="Search anything!"
            />
          </div>
          <div id="map">
            {latitude && longitude ? (
              <GenerateStaticGoogleMap
                latitude={latitude}
                longitude={longitude}
              />
            ) : (
              "Search using the box above!"
            )}
          </div>
        </div>
      </div>
    );
  }

  getLocation = coordinates => {
    return this.props
      .getStores(coordinates)
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
  };

  onChangeAddress = address => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        location: {
          ...this.state.data.location,
          address
        }
      }
    });
  };

  onAddressSelect = (address, placeId) => {
    //get the formatted address, associated lat/long points, limit length of lat/long
    //set state with info
    geocodeByAddress(address)
      .then(results => {
        const address = results[0].formatted_address;
        const latitude = parseFloat(results[0].geometry.location.lat()).toFixed(
          7
        );
        const longitude = parseFloat(
          results[0].geometry.location.lng()
        ).toFixed(7);
        this.setState({
          ...this.state,
          data: {
            ...this.state.data,
            location: { address, latitude, longitude }
          }
        });
      })
      .catch(error => console.error("Error", error));
  };
}
Map.propTypes = {
  getStores: PropTypes.func.isRequired
};

export default connect(null, { getStores })(Map);

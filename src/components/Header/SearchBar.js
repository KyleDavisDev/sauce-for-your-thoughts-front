import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getStoresBySearch as getStores } from "../../actions/stores";
import PropTypes from "prop-types";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    };

    // this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  render() {
    return (
      <div className="nav-section nav-search">
        <div className="search">
          <input
            type="text"
            placeholder="Coffee, beer..."
            name="search"
            onChange={this.handleSearchChange}
            value={this.state.searchValue}
          />
        </div>
      </div>
    );
  }

  handleSearchChange = e => {
    const searchValue = e.target.value;
    this.setState({ searchValue });
    this.props
      .getStores(searchValue)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        //err.message hold human-readable text
      });
  };
}
SearchBar.propTypes = {
  getStores: PropTypes.func.isRequired
};

export default connect(null, { getStores })(SearchBar);

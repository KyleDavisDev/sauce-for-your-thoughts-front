import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getStoresBySearch as getStores } from "../../actions/stores";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      searchValue: ""
    };
  }

  render() {
    const { results } = this.state;
    return (
      <div className="nav-section nav-search">
        <div className="search">
          <input
            type="text"
            placeholder="Coffee, beer..."
            name="search"
            onChange={this.handleSearchChange}
            value={this.state.searchValue}
            onKeyDown={this.handleKeyPress}
          />
          <div className="search-results">
            {results.length > 0 &&
              results.map(result => {
                return (
                  <NavLink
                    className="search-result"
                    to={`/store/${result.slug}`}
                    key={result.slug}
                    activeClassName="active"
                    onClick={this.handleClick}
                  >
                    <strong>{result.name}</strong>
                  </NavLink>
                );
              })}
          </div>
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
        //When found a store
        const results = res.stores.map(store => {
          store.focus = false;
          return store;
        });
        this.setState({ results });
      })
      .catch(err => {
        this.setState({ results: [] });
        //err.message hold human-readable text
      });
  };

  handleKeyPress = e => {
    //13 = enter
    //38 = up arrow
    //40 = down arrow
    if (![13, 38, 40].includes(e.keyCode)) return;

    const index = this.state.results.find(store => store.focus === true);
    if (index === undefined) {
      if (e.keyCode === 40) {
      }
    }
    // if(e.keyCode === 40) {
    //   const results = this.state.results.map((result,ind) => {
    //     if(ind === index) {
    //       result.focus = false
    //     }
    //   })
    //   this.setState({ results:   })
    // }
  };

  handleClick = () =>
    this.setState({
      searchValue: "",
      results: []
    });
}
SearchBar.propTypes = {
  getStores: PropTypes.func.isRequired
};

export default connect(null, { getStores })(SearchBar);

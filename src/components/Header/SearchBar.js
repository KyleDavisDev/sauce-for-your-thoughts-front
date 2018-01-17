import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getSaucesBySearch as getSauces } from "../../actions/sauces";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      searchValue: "",
      noResults: ""
    };

    this.searchResultRefs = [];
  }

  render() {
    const { results, noResults } = this.state;
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
            onBlur={this.handleBlur}
          />
          <div className="search-results">
            {results.length > 0 &&
              results.map((result, ind) => {
                return (
                  <a
                    className="search-result"
                    href={`/sauce/${result.slug}`}
                    key={result.slug}
                    ref={this.addItemToRefList(ind)}
                    onKeyDown={this.changeFocus(ind)}
                  >
                    <strong>{result.name}</strong>
                  </a>
                );
              })}
            {noResults.length > 0 && (
              <a className="search-result" href={`#`} onBlur={this.handleBlur}>
                No results for <strong>{noResults}</strong> found
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  handleSearchChange = e => {
    const searchValue = e.target.value;
    this.setState({ searchValue });
    this.props
      .getSauces(searchValue)
      .then(res => {
        //When found a sauce
        const results = res.sauces.map(sauce => {
          sauce.focus = false;
          return sauce;
        });
        this.setState({ results, noResults: "" });
      })
      .catch(err => {
        this.setState({ results: [], noResults: searchValue });
        //err.message hold human-readable text
      });
  };

  handleKeyPress = e => {
    //13 = enter
    //38 = up arrow
    //40 = down arrow
    if (![13, 38, 40].includes(e.keyCode)) return;

    if (e.keyCode === 40) {
      this.searchResultRefs[0].focus();
    } else {
      this.searchResultRefs[this.state.results.length - 1].focus();
    }
  };

  changeFocus = index => {
    return e => {
      //38 = up arrow
      //40 = down arrow
      if (![38, 40].includes(e.keyCode)) return;

      const len = this.searchResultRefs.length;
      let newIndex;
      if (e.keyCode === 40) {
        newIndex = (index + 1) % len;
      } else if (e.keyCode === 38) {
        newIndex = index === 0 ? len - 1 : index - 1;
      }
      this.searchResultRefs[newIndex].focus();
    };
  };
  addItemToRefList(index) {
    return input => {
      this.searchResultRefs[index] = input;
    };
  }

  handleBlur = e => {
    if (e.relatedTarget && e.relatedTarget.classList.contains("search-result"))
      return;

    this.setState({
      results: [],
      noResults: ""
    });
  };
}
SearchBar.propTypes = {
  getSauces: PropTypes.func.isRequired
};

export default connect(null, { getSauces })(SearchBar);

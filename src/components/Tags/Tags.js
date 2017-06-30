import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import StoreCard from "../StoreCard/StoreCard.js";

class Tags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      tags: {},
      stores: {}
    };
  }

  componentWillMount() {
    const tag = this.props.match.params.tag;
    this.setState({ title: tag });

    axios
      .get(`http://localhost:7777/api/tags/${tag}/get`)
      .then(response => {
        this.setState({ tags: response.data[0], stores: response.data[1] });
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    const tag = nextProps.match.params.tag;
    this.setState({ title: tag });
    axios
      .get(`http://localhost:7777/api/tags/${tag}/get`)
      .then(response => {
        this.setState({ tags: response.data[0], stores: response.data[1] });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="inner">
        <h2>
          {this.state.title || "Tags"}
        </h2>
        {this.state.tags.length > 0 &&
          <ul className="tags">
            {this.state.tags.map(tag => {
              return (
                <li key={tag._id} className="tag">
                  <NavLink
                    activeClassName="tag-link-active"
                    to={`/tags/${tag._id}`}
                    className="tag-link"
                  >
                    <span className="tag-text">
                      {tag._id}
                    </span>
                    <span className="tag-count">
                      {tag.count}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>}
        {this.state.stores.length > 0 &&
          <StoreCard stores={this.state.stores} />}
      </div>
    );
  }
}

module.exports = Tags;

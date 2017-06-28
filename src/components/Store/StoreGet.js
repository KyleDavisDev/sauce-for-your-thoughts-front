import React, { Component } from "react";
import axios from 'axios'

class StoreGet extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const storeSlug = this.props.match.params.slug;
  }
  render() {
    return <span> yo!</span>;
  }
}

module.exports = StoreGet;

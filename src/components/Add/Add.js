import React, { Component } from "react";

import StoreForm from "./StoreForm.js"

class Add extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="inner">
        <h2>Add Store</h2>
        <StoreForm />
      </div>
    );
  }
}

module.exports = Add;

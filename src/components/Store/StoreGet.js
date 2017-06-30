import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class GenerateStaticGoogleMap extends Component {
  render() {
    return (
      <img
        className={this.props.className}
        src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.props.coordinates
          .reverse()
          .join()}&zoom=14&size=800x150&key=AIzaSyBjyKevCZH8vO5TOByZaH37d--miW703f8&markers=${this.props.coordinates.join()}&scale=2`}
      />
    );
  }
}

class GenerateTagsList extends Component {
  render() {
    return (
      <ul className="tags">
        {this.props.tags.map(tag => {
          return (
            <li className="tag" key={tag}>
              <Link to={`/tags/${tag}`} className="tag-link">
                <span className="tag-text">
                  #{tag}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

class StoreGet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const storeSlug = this.props.match.params.slug;

    axios
      .get(`http://localhost:7777/api/store/${storeSlug}`)
      .then(response => {
        //if unable to find store, redirect to 404
        if (response.data == "") {
          this.props.history.push("/404");
        } else {
          this.setState({ store: response.data });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="inner">
        {this.state.store &&
          <div className="single">
            <div className="single-hero">
              <img
                className="single-image"
                src={`http://localhost:7777/uploads/public/${this.state.store
                  .photo}`}
                onError={e =>
                  (e.target.src = "http://localhost:7777/images/store.jpg")}
              />
              <h2 className="title title-single">
                <Link to={this.state.store.slug}>
                  {this.state.store.name}
                </Link>
              </h2>
            </div>
          </div>}
        {this.state.store &&
          <div className="single-details inner">
            <GenerateStaticGoogleMap
              coordinates={this.state.store.location.coordinates}
              className="single-map"
            />
            <p className="single-location">
              {this.state.store.location.address}
            </p>
            <p>
              {this.state.store.description}
            </p>
            {this.state.store.tags.length > 0 &&
              <GenerateTagsList tags={this.state.store.tags} />}
          </div>}
      </div>
    );
  }
}

module.exports = StoreGet;

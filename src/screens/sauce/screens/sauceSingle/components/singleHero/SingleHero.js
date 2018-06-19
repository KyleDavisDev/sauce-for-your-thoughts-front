import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SingleInformation from "./components/singleInformation/SingleInformation";

import { host } from "../../../../../../utils/api/api";
import ComingSoon from "../../../../../../images/photos/ComingSoon.png";
import { getSauceBySlug } from "../../../../../../redux/actions/sauces";

class SingleHero extends React.Component {
  static propTypes = {
    sauce: PropTypes.shape({
      name: PropTypes.string.isRequired,
      photo: PropTypes.string,
      slug: PropTypes.string.isRequired,
      maker: PropTypes.string.isRequired,
      shu: PropTypes.number,
      location: PropTypes.shape({
        city: PropTypes.string,
        state: PropTypes.string,
        country: PropTypes.string
      }).isRequired,
      description: PropTypes.string.isRequired,
      peppers: PropTypes.arrayOf(PropTypes.string)
    }),
    getSauceBySlug: PropTypes.func.isRequired,
    slug: PropTypes.string.isRequired
  };

  static defaultProps = {
    sauce: {
      name: "",
      photo: "",
      slug: "",
      maker: "",
      shu: 0,
      location: { city: "", state: "", country: "" },
      description: "",
      peppers: [""]
    }
  };

  componentDidMount() {
    const { slug } = this.props;
    this.getSauceBySlug({ slug });
  }

  render() {
    const { sauce } = this.props;
    return (
      <div className="hero">
        <div className="hero__container--tilted">
          {sauce && (
            <div className="hero__container">
              <div className="hero__header">
                <h3 className="hero__title">
                  <Link to={sauce.slug || "#"}>
                    {sauce.name || "Loading..."}
                  </Link>
                </h3>
              </div>
              <div className="hero__content">
                <div className="hero__image__container">
                  <img
                    alt={`User-submitted background for ${sauce.name}`}
                    className="hero__image"
                    src={`${host}/public/uploads/${sauce.photo}`}
                    onError={e => (e.target.src = ComingSoon)}
                  />
                </div>
                <SingleInformation sauce={sauce} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  getSauceBySlug = ({ slug }) => {
    this.props.getSauceBySlug(slug).catch(err => {
      console.log(err);
    });
  };
}
const mapStateToProps = (state, ownProps) => {
  // get the ID of the sauce that matches the page slug
  const sauceID =
    state.sauces.allIds.length > 0 && //
    Object.keys(state.sauces.byId).length > 0 && // This should definitely pass if the above passed
    state.sauces.allIds.find(
      // Find the sauce with the matching slug
      x => state.sauces.byId[x].slug === ownProps.slug
    );

  const sauce = sauceID // find specific sauce or set default values
    ? state.sauces.byId[sauceID]
    : null;

  return { sauce };
};

const mapDispatchToProps = {
  getSauceBySlug
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleHero);

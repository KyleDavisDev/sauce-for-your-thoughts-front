import React from "react";
import PropTypes from "prop-types";

export const GenerateStaticGoogleMap = ({ className, longitude, latitude }) => {
  return (
    <img
      className={className}
      src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=800x150&key=AIzaSyBjyKevCZH8vO5TOByZaH37d--miW703f8&markers=${latitude},${longitude}&scale=2`}
    />
  );
};
GenerateStaticGoogleMap.proptypes = {
  className: PropTypes.string,
  longitude: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  latitude: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired
};

// export const Generate

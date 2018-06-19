import React, { Component } from "react";

import Fire from "react-icons/lib/io/fireball";
import Thermometer from "react-icons/lib/io/thermometer";
import Maker from "react-icons/lib/io/erlenmeyer-flask";
import Compass from "react-icons/lib/io/compass";
import Description from "react-icons/lib/io/information";

const SingleInformation = ({ sauce }) => {
  const keys = Object.keys(sauce); // make sure we were actually passed something
  return keys ? (
    <div className="single__information">
      {/* Maker */}
      <div className="single__item">
        <div className="item__icon">
          <Maker />
        </div>
        <div className="item__body">
          <div className="item__title">Maker</div>
          <div className="item__desc">{sauce.maker}</div>
        </div>
      </div>

      {/* Description */}
      <div className="single__item">
        <div className="item__icon">
          <Description />
        </div>
        <div className="item__body">
          <div className="item__title">Description</div>
          <div className="item__desc">{sauce.description}</div>
        </div>
      </div>

      {/* Heat */}
      <div className="single__item">
        <div className="item__icon">
          <Thermometer />
        </div>
        <div className="item__body">
          <div className="item__title">Heat</div>
          <div className="item__desc">{sauce.shu || <em>None</em>}</div>
        </div>
      </div>

      {/* Peppers */}
      <div className="single__item">
        <div className="item__icon">
          <Fire />
        </div>
        <div className="item__body">
          <div className="item__title">Peppers</div>
          <div className="item__desc">
            {sauce.peppers.length > 0 ? (
              sauce.peppers.join(", ")
            ) : (
              <em>None</em>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="single__item">
        <div className="item__icon">
          <Compass />
        </div>
        <div className="item__body">
          <div className="item__title">Location</div>
          <div className="item__desc">
            {sauce.location.city &&
            sauce.location.state &&
            sauce.location.country ? (
              `${sauce.location.city}, ${sauce.location.state}, ${
                sauce.location.country
              }`
            ) : (
              <em>None</em>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div />
  );
};

export default SingleInformation;

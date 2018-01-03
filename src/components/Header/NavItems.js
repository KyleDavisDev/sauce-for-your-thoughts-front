import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import StoresLogo from "../../images/icons/Store";
import TagLogo from "../../images/icons/Tag";
import TopLogo from "../../images/icons/Top";
import AddLogo from "../../images/icons/Add";
import MapLogo from "../../images/icons/Map";
import SauceLogo from "../../images/icons/Sauce";

const NavItems = () => {
  const navigationItems = [
    // {
    //   text: "Stores",
    //   img: <StoresLogo />,
    //   linkTo: "stores",
    //   imgTitle: "Stores"
    // },
    {
      text: "Sauces",
      img: <SauceLogo />,
      linkTo: "sauces",
      imgTitle: "Sauces"
    },
    {
      text: "Tags",
      img: <TagLogo />,
      linkTo: "tags",
      imgTitle: "Tags"
    },
    {
      text: "Top",
      img: <TopLogo />,
      linkTo: "top",
      imgTitle: "Top"
    },
    {
      text: "Add",
      img: <AddLogo />,
      linkTo: "add",
      imgTitle: "Add"
    },
    {
      text: "Map",
      img: <MapLogo />,
      linkTo: "map",
      imgTitle: "Map"
    }
  ];
  return (
    <div className="item-holder">
      {navigationItems.map(item => {
        return (
          <li key={item.text} className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to={`/${item.linkTo}`}
            >
              {item.img}
              <span>{item.text.toUpperCase()}</span>
            </NavLink>
          </li>
        );
      })}
    </div>
  );
};

NavItems.propTypes = {
  // item
};

export default NavItems;

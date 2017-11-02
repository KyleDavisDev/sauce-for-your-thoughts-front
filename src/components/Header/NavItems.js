import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import StoresLogo from "../../images/icons/Store.js";
import TagLogo from "../../images/icons/Tag.js";
import TopLogo from "../../images/icons/Top.js";
import AddLogo from "../../images/icons/Add.js";
import MapLogo from "../../images/icons/Map.js";

const NavItems = () => {
  const navigationItems = [
    {
      text: "Stores",
      img: <StoresLogo />,
      linkTo: "stores",
      imgTitle: "Stores"
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

import React from "react";
import { NavLink } from "react-router-dom";
import TagLogo from "../../images/icons/Tag";
import TopLogo from "../../images/icons/Top";
import AddLogo from "../../images/icons/Add";
import SauceLogo from "../../images/icons/Sauce";

const NavItems = () => {
  const navigationItems = [
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
      linkTo: "sauce/add",
      imgTitle: "Add"
    }
  ];
  return (
    <div className="item-holder">
      {navigationItems.map(item => (
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
      ))}
    </div>
  );
};

export default NavItems;

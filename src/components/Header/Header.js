import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

//pull in logos
import MainLogo from '../../images/icons/Logo.js'
import StoresLogo from '../../images/icons/Store.js'
import TagLogo from '../../images/icons/Tag.js'
import TopLogo from '../../images/icons/Top.js'
import AddLogo from '../../images/icons/Add.js'
import MapLogo from '../../images/icons/Map.js'

//style
import './header.scss'

class Header extends Component {
    render() {
		const navigationItems = [
			{ text: "Stores", img: <StoresLogo height="35" width="35" />, imgTitle: "Stores" },
			{ text: "Tags", img: <TagLogo height="35" width="35" />, imgTitle: "Tags" },
			{ text: "Top", img: <TopLogo height="35" width="35" />, imgTitle: "Top" },
			{ text: "Add", img: <AddLogo height="35" width="35" />, imgTitle: "Add" },
			{ text: "Map", img: <MapLogo height="35" width="35" />, imgTitle: "Map" },
		]
        return(
            <div className="nav-container" >
                <div id="navBar" >
                    <NavLink exact className="home-link" activeClassName="active" to="/" >
                        <MainLogo className="home-logo" height="50" width="100" />
                    </NavLink>

                    <div id="nav-items-container">
						<ul>
							{
								navigationItems.map( (item) => {
									return (
										<li key={item.text} >
											{item.img}
											{item.text.toUpperCase()}
										</li>
									)
								})
							}
						</ul>
					</div>
                </div>
            </div>
        )
    }
}

module.exports = Header
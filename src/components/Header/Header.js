import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

class Header extends Component {
    render() {
        return(
            <div className="nav-container" >
                <div id="navBar" >
                    <NavLink exact className="home-link" activeClassName="active" to="/" >
                        Damn that's good
                    </NavLink>

                    <div id="nav-items-container">
						<ul>
							<li>
								<NavLink className="menu-link" activeClassName="active" to="/projects">
									Projects
								</NavLink>
							</li>
							<li>
								<a className="menu-link" target="_blank" href="/resume">
									Resume
								</a>
							</li>
						</ul>
					</div>
                </div>
            </div>
        )
    }
}

module.exports = Header
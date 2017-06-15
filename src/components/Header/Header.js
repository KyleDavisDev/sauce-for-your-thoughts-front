import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

//pull in logos
import MainLogo from "../../images/icons/Logo.js";
import StoresLogo from "../../images/icons/Store.js";
import TagLogo from "../../images/icons/Tag.js";
import TopLogo from "../../images/icons/Top.js";
import AddLogo from "../../images/icons/Add.js";
import MapLogo from "../../images/icons/Map.js";

//style
import "./header.scss";

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchValue: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ searchValue: "" });
	}

	handleSearchChange(event) {
		this.setState({ searchValue: event.target.value });
	}

	handleMouseEnter() {
		console.log("enter");
	}

	handleMouseLeave() {
		console.log("leave");
	}

	render() {
		const navigationItems = [
			{
				text: "Stores",
				img: <StoresLogo height="40" width="40" />,
				linkTo: "/stores",
				imgTitle: "Stores"
			},
			{
				text: "Tags",
				img: <TagLogo height="40" width="40" />,
				linkTo: "/tags",
				imgTitle: "Tags"
			},
			{ text: "Top", img: <TopLogo height="40" width="40" />, linkTo: "/top", imgTitle: "Top" },
			{
				text: "Add",
				img: (
					<AddLogo
						height="40"
						width="40"
						onMouseEnterHandler={this.handleMouseEnter}
						onMouseLeaveHandler={this.handleMouseLeave}
					/>
				),
				linkTo: "/add",
				imgTitle: "Add"
			},
			{ text: "Map", img: <MapLogo height="40" width="40" />, linkTo: "/map", imgTitle: "Map" }
		];
		return (
			<div className="nav-container">
				<div id="navigation">
					<div id="home-logo-container">
						<NavLink exact className="home-link" activeClassName="active" to="/">
							<MainLogo className="home-logo" height="83" width="200" />
						</NavLink>
					</div>

					<div id="nav-items-container">
						<ul>
							{navigationItems.map(item => {
								return (
									<li key={item.text}>
										<NavLink className="nav-item-link" activeClassName="active" to={item.linkTo}>
											{item.img}
											<span className="nav-item-text">{item.text.toUpperCase()}</span>
										</NavLink>
									</li>
								);
							})}
						</ul>
					</div>

					<div id="search-container">
						<form onSubmit={this.handleSubmit}>
							<input
								type="text"
								placeholder="Coffee, beer..."
								name="search"
								onChange={this.handleSearchChange}
								value={this.state.searchValue}
							/>
							<button type="submit" className="search"> Submit </button>
						</form>
					</div>
				</div>

				<div id="login-register" >
					
				</div>
			</div>
		);
	}
}

module.exports = Header;

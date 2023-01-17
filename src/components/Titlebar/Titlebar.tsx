import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs } from "../../Tabs";
import "./Titlebar.scss";

const Titlebar = React.memo(
	(props: { onTabSelect: (arg0: string) => void; activeTab: string }) => {
		const [activeTab, setActiveTab] = React.useState(props.activeTab);
		const location = useLocation();

		function changeTab(tabClicked: string) {
			setActiveTab(tabClicked);
			props.onTabSelect(tabClicked);
			document.getElementById(tabClicked)?.classList.add("space--active");
			for (const space of document.querySelectorAll(".space"))
				if (space.id !== tabClicked) space.classList.remove("space--active");
		}

		useEffect(() => {
			changeTab(props.activeTab);
		}, [props.activeTab]);

		useEffect(() => {
			changeTab(location.pathname.slice(1) || "about");
		}, [activeTab, location]);

		return (
			<header className="titlebar">
				<div className="spaces">
					{Object.entries(Tabs).map((tab, index) => (
						<Link
							to={tab[1].path}
							className="space"
							id={tab[0]}
							key={tab[0]}
							onClick={e => {
								changeTab(e.currentTarget.id);
							}}
						>
							{index + 1}
							{typeof tab[1].icon !== "string" ? (
								<svg height="24" viewBox="0 0 24 24" width="24">
									{tab[1].icon}
								</svg>
							) : (
								<img src={tab[1].icon} width="24" height="24" alt={tab[0]} />
							)}
						</Link>
					))}
				</div>
				<div
					className="code-btn"
					onClick={() =>
						(window.location.href = "https://github.com/kyrie25/portfolio")
					}
				>
					<img
						title="GitHub logo"
						src={require("../../assets/github.png")}
					></img>
					Source code
				</div>
				<div className="process">guest@kyrie25.me:~</div>
			</header>
		);
	}
);
export default Titlebar;

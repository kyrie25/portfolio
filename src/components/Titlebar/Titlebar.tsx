import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs } from "../../Tabs";
import "./Titlebar.scss";

const Titlebar = React.memo(
	(props: { onTabSelect: (arg0: string) => void; activeTab: any }) => {
		const [activeTab, setActiveTab] = React.useState(props.activeTab);
		const location = useLocation();

		function changeTab(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
			setActiveTab(e.currentTarget.id);
			props.onTabSelect(e.currentTarget.id);
			e.currentTarget.classList.add("space--active");
			for (const space of document.querySelectorAll(".space"))
				if (space !== e.currentTarget) space.classList.remove("space--active");
		}

		useEffect(() => {
			props.onTabSelect(activeTab);
			document.getElementById(activeTab)?.classList.add("space--active");
			for (const space of document.querySelectorAll(".space"))
				if (space.id !== activeTab) space.classList.remove("space--active");
		}, [activeTab]);

		useEffect(() => {
			setActiveTab(location.pathname.slice(1) || "about");
		}, [location]);

		const TabArray = Object.entries(Tabs);

		return (
			<header className="titlebar">
				<div className="spaces">
					{TabArray.map(tab => (
						<Link
							to={tab[1].path}
							className="space"
							id={tab[0]}
							key={tab[0]}
							onClick={e => {
								changeTab(e);
							}}
						>
							{TabArray.indexOf(tab) + 1}
							{typeof tab[1].icon !== "string" && (
								<svg height="24" viewBox="0 0 24 24" width="24">
									{tab[1].icon}
								</svg>
							)}
							{typeof tab[1].icon === "string" && (
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

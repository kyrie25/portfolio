import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Links, Tabs } from "@/Tabs";
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
			changeTab(location.pathname.slice(1) || Object.keys(Tabs)[0]);
		}, [activeTab, location]);

		return (
			<header className="titlebar">
				<div className="spaces">
					{Object.entries(Tabs).map(tab => (
						<Link
							to={tab[1].path}
							className="space"
							id={tab[0]}
							key={tab[0]}
							onClick={e => {
								changeTab(e.currentTarget.id);
							}}
						>
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
				<div className="process">guest@kyrie25.me:~</div>
				<div className="external-links">
					{Object.entries(Links).map(([key, value]) => (
						<a
							key={key}
							className="external-link"
							href={value.href}
							target="_blank"
							rel="noopener noreferrer"
							style={{
								backgroundColor: value.color
							}}
						>
							<img title={key} src={value.icon} />
							<span>{value.title}</span>
						</a>
					))}
				</div>
			</header>
		);
	}
);
export default Titlebar;

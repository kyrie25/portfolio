import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs } from "@/Tabs";
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
				<div className="process">guest@kyrie25.me:~</div>
				<div className="external-links">
					<a
						className="code-btn"
						href="https://github.com/kyrie25/portfolio"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							title="GitHub"
							src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRTdFN0U3IiAgcm9sZT0iaW1nIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPkdpdEh1YiBpY29uPC90aXRsZT48cGF0aCBkPSJNMTIgLjI5N2MtNi42MyAwLTEyIDUuMzczLTEyIDEyIDAgNS4zMDMgMy40MzggOS44IDguMjA1IDExLjM4NS42LjExMy44Mi0uMjU4LjgyLS41NzcgMC0uMjg1LS4wMS0xLjA0LS4wMTUtMi4wNC0zLjMzOC43MjQtNC4wNDItMS42MS00LjA0Mi0xLjYxQzQuNDIyIDE4LjA3IDMuNjMzIDE3LjcgMy42MzMgMTcuN2MtMS4wODctLjc0NC4wODQtLjcyOS4wODQtLjcyOSAxLjIwNS4wODQgMS44MzggMS4yMzYgMS44MzggMS4yMzYgMS4wNyAxLjgzNSAyLjgwOSAxLjMwNSAzLjQ5NS45OTguMTA4LS43NzYuNDE3LTEuMzA1Ljc2LTEuNjA1LTIuNjY1LS4zLTUuNDY2LTEuMzMyLTUuNDY2LTUuOTMgMC0xLjMxLjQ2NS0yLjM4IDEuMjM1LTMuMjItLjEzNS0uMzAzLS41NC0xLjUyMy4xMDUtMy4xNzYgMCAwIDEuMDA1LS4zMjIgMy4zIDEuMjMuOTYtLjI2NyAxLjk4LS4zOTkgMy0uNDA1IDEuMDIuMDA2IDIuMDQuMTM4IDMgLjQwNSAyLjI4LTEuNTUyIDMuMjg1LTEuMjMgMy4yODUtMS4yMy42NDUgMS42NTMuMjQgMi44NzMuMTIgMy4xNzYuNzY1Ljg0IDEuMjMgMS45MSAxLjIzIDMuMjIgMCA0LjYxLTIuODA1IDUuNjI1LTUuNDc1IDUuOTIuNDIuMzYuODEgMS4wOTYuODEgMi4yMiAwIDEuNjA2LS4wMTUgMi44OTYtLjAxNSAzLjI4NiAwIC4zMTUuMjEuNjkuODI1LjU3QzIwLjU2NSAyMi4wOTIgMjQgMTcuNTkyIDI0IDEyLjI5N2MwLTYuNjI3LTUuMzczLTEyLTEyLTEyIi8+PC9zdmc+"
						/>
						<span>Source code</span>
					</a>
					<a
						className="support-btn"
						href="https://paypal.me/pqnanh"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							title="PayPal"
							src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJ3aGl0ZSIgcm9sZT0iaW1nIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPlBheVBhbDwvdGl0bGU+PHBhdGggZD0iTTcuMDc2IDIxLjMzN0gyLjQ3YS42NDEuNjQxIDAgMCAxLS42MzMtLjc0TDQuOTQ0LjkwMUM1LjAyNi4zODIgNS40NzQgMCA1Ljk5OCAwaDcuNDZjMi41NyAwIDQuNTc4LjU0MyA1LjY5IDEuODEgMS4wMSAxLjE1IDEuMzA0IDIuNDIgMS4wMTIgNC4yODctLjAyMy4xNDMtLjA0Ny4yODgtLjA3Ny40MzctLjk4MyA1LjA1LTQuMzQ5IDYuNzk3LTguNjQ3IDYuNzk3aC0yLjE5Yy0uNTI0IDAtLjk2OC4zODItMS4wNS45bC0xLjEyIDcuMTA2em0xNC4xNDYtMTQuNDJhMy4zNSAzLjM1IDAgMCAwLS42MDctLjU0MWMtLjAxMy4wNzYtLjAyNi4xNzUtLjA0MS4yNTQtLjkzIDQuNzc4LTQuMDA1IDcuMjAxLTkuMTM4IDcuMjAxaC0yLjE5YS41NjMuNTYzIDAgMCAwLS41NTYuNDc5bC0xLjE4NyA3LjUyN2gtLjUwNmwtLjI0IDEuNTE2YS41Ni41NiAwIDAgMCAuNTU0LjY0N2gzLjg4MmMuNDYgMCAuODUtLjMzNC45MjItLjc4OC4wNi0uMjYuNzYtNC44NTIuODE2LTUuMDlhLjkzMi45MzIgMCAwIDEgLjkyMy0uNzg4aC41OGMzLjc2IDAgNi43MDUtMS41MjggNy41NjUtNS45NDYuMzYtMS44NDcuMTc0LTMuMzg4LS43NzctNC40NzF6Ii8+PC9zdmc+"
						/>
						<span>Support</span>
					</a>
				</div>
			</header>
		);
	}
);
export default Titlebar;

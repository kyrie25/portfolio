import React from "react";
import { Tabs } from "../../Tabs";
import "./Titlebar.scss";

class Titlebar extends React.Component<
	{ onTabSelect: (arg0: string) => void; activeTab: string },
	{ activeTab: string }
> {
	constructor(props) {
		super(props);
		Object.assign(this, props);
		this.state = {
			activeTab: props.activeTab
		};
	}

	changeTab(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		this.setState({ activeTab: e.currentTarget.id });
		this.props.onTabSelect(e.currentTarget.id);
		e.currentTarget.classList.add("space--active");
		for (const space of document.querySelectorAll(".space"))
			if (space !== e.currentTarget) space.classList.remove("space--active");
	}

	componentDidMount(): void {
		document
			.querySelector(`#${this.state.activeTab}`)
			?.classList.add("space--active");
	}

	render() {
		const TabArray = Object.entries(Tabs);
		return (
			<div className="titlebar">
				<div className="spaces">
					{TabArray.map(tab => (
						<div
							className="space"
							id={tab[0]}
							key={tab[0]}
							onClick={e => {
								this.changeTab(e);
							}}
						>
							{TabArray.indexOf(tab) + 1}
							<svg height="24" viewBox="0 0 24 24" width="24">
								{tab[1].icon}
							</svg>
						</div>
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
			</div>
		);
	}
}
export default Titlebar;

import React from "react";
import "./Titlebar.scss";

class Titlebar extends React.Component<
	{ onTabSelect: (arg0: string) => void; activeTab: string; tabs: string[] },
	{ activeTab: string }
> {
	icons: { [s: string]: JSX.Element };
	constructor(props) {
		super(props);
		Object.assign(this, props);
		this.state = {
			activeTab: props.activeTab
		};
		this.icons = {
			home: (
				<path d="M9.67432 12.8243L2.38645 20.1121C2.03496 20.4636 1.46511 20.4636 1.11366 20.1121L0.263607 19.2621C-0.0872808 18.9112 -0.0879557 18.3425 0.262107 17.9908L6.03794 12.1878L0.262145 6.38491C-0.0879182 6.0332 -0.0872432 5.46451 0.263645 5.11363L1.11366 4.26362C1.46515 3.91213 2.035 3.91213 2.38645 4.26362L9.67432 11.5515C10.0258 11.9029 10.0258 12.4728 9.67432 12.8243ZM24 19.6878V18.4878C24 17.9908 23.5971 17.5878 23.1 17.5878H11.7C11.203 17.5878 10.8 17.9908 10.8 18.4878V19.6878C10.8 20.1849 11.203 20.5878 11.7 20.5878H23.1C23.5971 20.5878 24 20.1849 24 19.6878Z" />
			),
			music: (
				<path
					clipRule="evenodd"
					d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zm4.28-18.93l.5-.07c.23 0 .39.12.45.34.02.07.01 9.1.01 10.6a1.9 1.9 0 0 1-1.37 1.76c-.47.14-1.15.2-1.48.12-.3-.07-.52-.2-.75-.44-.35-.34-.5-.7-.5-1.15 0-.25.04-.44.16-.7.17-.36.4-.57.79-.77.31-.16.6-.24 1.42-.41.54-.12.76-.16.87-.29.15-.17.04-5.36 0-5.43-.07-.1-.2-.14-.35-.12l-5.62 1.13a.4.4 0 0 0-.29.32l-.02 1.34c-.01 2.2-.05 6.39-.16 6.7a2.3 2.3 0 0 1-.18.37c-.14.2-.4.46-.6.58-.5.29-1.45.44-1.96.3-.54-.14-.94-.5-1.12-1.03-.09-.24-.1-.65-.05-.93.07-.28.22-.55.41-.75.35-.35.77-.52 1.88-.74l.55-.13a.64.64 0 0 0 .34-.32c.04-.1.07-8.5.07-8.5l.06-.1a.7.7 0 0 1 .36-.34c.1-.03 5.64-1.16 6.58-1.34z"
					fillRule="evenodd"
				/>
			),
			about: (
				<>
					<path d="M21.7 17.9l-1 .4c-1.1.4-2.2.6-3.4.6C13 19 9 16 9 12a3 3 0 0 1 1.5-2.5c-4 .2-5 4.3-5 6.8 0 7 6.4 7.6 7.8 7.6.7 0 1.8-.2 2.5-.4h.1a12 12 0 0 0 6.3-5 .4.4 0 0 0-.5-.5z" />
					<path d="M21.7 17.9l-1 .4c-1.1.4-2.2.6-3.4.6C13 19 9 16 9 12a3 3 0 0 1 1.5-2.5c-4 .2-5 4.3-5 6.8 0 7 6.4 7.6 7.8 7.6.7 0 1.8-.2 2.5-.4h.1a12 12 0 0 0 6.3-5 .4.4 0 0 0-.5-.5z" />
					<path d="M10 22.6a7.6 7.6 0 0 1 .6-13.2c.2-.2.7-.4 1.4-.4a3 3 0 0 1 3 3s2.3-7.5-7.5-7.5c-4.1 0-7.5 4-7.5 7.3a12 12 0 0 0 15.8 11.5 7 7 0 0 1-5.9-.7z" />
					<path d="M10 22.6a7.6 7.6 0 0 1 .6-13.2c.2-.2.7-.4 1.4-.4a3 3 0 0 1 3 3s2.3-7.5-7.5-7.5c-4.1 0-7.5 4-7.5 7.3a12 12 0 0 0 15.8 11.5 7 7 0 0 1-5.9-.7z" />
					<path d="M14.3 14c-.1 0-.3.2-.3.5 0 .2.1.5.4.7 1.4.9 3.9.8 4 .8 1 0 1.9-.3 2.7-.8a5.8 5.8 0 0 0 2.9-5c0-2-.8-3.5-1-4A12 12 0 0 0 12 0 12 12 0 0 0 0 11.8c0-3.4 3.4-6.2 7.5-6.2a9 9 0 0 1 4 1A6 6 0 0 1 15 12c0 .5-.3 1.2-.8 1.9z" />
					<path d="M14.3 14c-.1 0-.3.2-.3.5 0 .2.1.5.4.7 1.4.9 3.9.8 4 .8 1 0 1.9-.3 2.7-.8a5.8 5.8 0 0 0 2.9-5c0-2-.8-3.5-1-4A12 12 0 0 0 12 0 12 12 0 0 0 0 11.8c0-3.4 3.4-6.2 7.5-6.2a9 9 0 0 1 4 1A6 6 0 0 1 15 12c0 .5-.3 1.2-.8 1.9z" />
				</>
			)
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
		return (
			<div className="titlebar">
				<div className="spaces">
					{this.props.tabs.map((tab, index) => (
						<div
							className="space"
							id={tab}
							key={tab}
							onClick={e => {
								this.changeTab(e);
							}}
						>
							{index + 1}
							<svg height="24" viewBox="0 0 24 24" width="24">
								{this.icons[tab]}
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

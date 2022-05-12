import React from "react";
import "./Social.scss";

class Social extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="social__container">
				<p>My social links</p>
				<div className="button__container">
					<div className="button__wrapper" id="crowdin">
						<a
							title="Crowdin"
							href="https://crowdin.com/profile/kyrie_25"
							target="_blank"
							rel="noopener noreferrer"
						>
							Crowdin
						</a>
					</div>
					<div className="button__wrapper" id="github">
						<a
							title="GitHub"
							href="https://github.com/kyrie25"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub
						</a>
					</div>
					<div className="button__wrapper" id="premid">
						<a
							title="PreMiD"
							href="https://premid.app/users/368399721494216706"
							target="_blank"
							rel="noopener noreferrer"
						>
							PreMiD
						</a>
					</div>
					<div className="button__wrapper" id="discord">
						<a
							title="Discord"
							href="https://discord.com/users/368399721494216706"
							target="_blank"
							rel="noopener noreferrer"
						>
							Discord
						</a>
					</div>
					<div className="button__wrapper" id="twitter">
						<a
							title="Twitter"
							href="https://twitter.com/_kyrie_25"
							target="_blank"
							rel="noopener noreferrer"
						>
							Twitter
						</a>
					</div>
				</div>
			</div>
		);
	}
}
export default Social;

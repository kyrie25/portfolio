/* eslint-disable no-one-time-vars/no-one-time-vars */
import React from "react";
import FadeIn from "react-fade-in";
import { Track } from "use-last-fm";

import "../Music.scss";

class Streams extends React.Component<
	Record<string, unknown>,
	{
		fetched: boolean;
		songs: Track[];
		error: null;
	}
> {
	constructor(props) {
		super(props);
		Object.assign(this, props);
		this.state = {
			fetched: false,
			songs: [],
			error: null
		};
	}

	componentDidMount() {
		// Replace variable values with your chosen Last.fm username & API key
		const username = "kyrie25",
			apiKey = "0ce7260f5b1e3045c195c4dc12c0af87";

		fetch(
			`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=10`
		)
			.then(res => res.json())
			.then(
				result => {
					this.setState({
						fetched: true,
						songs: result.recenttracks.track
					});
				},
				error => {
					this.setState({
						fetched: true,
						error
					});
				}
			);
	}

	render() {
		const { fetched, error, songs } = this.state;
		if (fetched && !error) {
			return (
				<FadeIn>
					<div className="streams__container">
						<p>Recently played</p>
						<div className="songs__container">
							{songs.map((song, index) => {
								if (song["@attr"]?.nowplaying === "true") {
									return (
										<div className="song__wrapper" key={index}>
											<img
												src={song.image[song.image.length - 1]["#text"]}
											></img>
											<div className="song" id={index.toString()}>
												<a href={song.url}>
													<p className="title">{song.name}</p>
													<p className="artist">{song.artist["#text"]}</p>
												</a>
											</div>
											<img
												src={require("./icon/now_playing.gif")}
												id="now-playing"
											/>
										</div>
									);
								} else {
									return (
										<div className="song__wrapper" key={index}>
											<img
												src={song.image[song.image.length - 1]["#text"]}
											></img>
											<div className="song" id={index.toString()}>
												<a href={song.url}>
													<p className="title">{song.name}</p>
													<p className="artist">{song.artist["#text"]}</p>
												</a>
											</div>
										</div>
									);
								}
							})}
						</div>
					</div>
				</FadeIn>
			);
		} else if (!fetched) {
			return (
				<FadeIn>
					<div className="streams__container">
						<p>Recently played</p>
						<div className="songs__container">
							<p>Fetching songs from Last.fm API...</p>
						</div>
					</div>
				</FadeIn>
			);
		} else if (fetched && error) {
			return (
				<FadeIn>
					<div className="streams__container">
						<p>Recently played</p>
						<div className="songs__container">
							<p>Failed to connect to Last.fm.</p>
						</div>
					</div>
				</FadeIn>
			);
		}
	}
}
export default Streams;

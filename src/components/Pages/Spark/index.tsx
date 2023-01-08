import React from "react";
import FadeIn from "../../../utils/FadeIn/FadeIn";

import "./Spark.scss";

const Spark = React.memo(() => {
	let savedSpark: { "10Ticket": number; Ticket: number; Crystals: number };

	try {
		const parsed = JSON.parse(localStorage.getItem("spark") || "");
		console.log(parsed);
		if (typeof parsed === "object" && parsed.Crystals !== undefined)
			savedSpark = parsed;
		else throw "";
	} catch (e) {
		console.warn("Empty or invalid spark data, resetting...");
		savedSpark = {
			"10Ticket": 0,
			Ticket: 0,
			Crystals: 0
		};
	}

	const [spark, setSpark] = React.useState(savedSpark);

	const sparkMetadata = {
		"10Ticket": {
			image: require("../../../assets/spark/10Ticket.jpg"),
			string: "10-Part Ticket"
		},
		Ticket: {
			image: require("../../../assets/spark/Ticket.png"),
			string: "Ticket"
		},
		Crystals: {
			image: require("../../../assets/spark/Crystal.jpg"),
			string: "Crystals"
		}
	};

	const saveSpark = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		console.log(id, value);
		setSpark({ ...spark, [id]: value });
		localStorage.setItem("spark", JSON.stringify({ ...spark, [id]: value }));
	};

	const calculateSpark = () => {
		const { "10Ticket": tenTicket, Ticket, Crystals } = spark;
		return Number(tenTicket) * 10 + Number(Ticket) + Number(Crystals) / 300;
	};

	const resetSpark = () => {
		setSpark({
			"10Ticket": 0,
			Ticket: 0,
			Crystals: 0
		});
		localStorage.setItem("spark", JSON.stringify({}));
	};

	const progressBarColorManipulation = () => {
		if (calculateSpark() === 0 || calculateSpark() >= 300) return "100%";
		const sparkCount = 300 / calculateSpark();
		return `${100 / (1 / sparkCount)}%`;
	};

	return (
		<FadeIn>
			<div className="spark-input__container">
				<h2 className="spark-input__container__title">
					<span>GBF</span> Spark Calculator
				</h2>
				<div className="spark-input__input-section">
					{Object.keys(sparkMetadata).map(key => {
						return (
							<div
								className="spark-input__container__input__item"
								key={key}
								id={key}
								onChange={saveSpark}
							>
								<h4 className="spark-input__container__input__item-title">
									{sparkMetadata[key].string}
								</h4>
								<img src={sparkMetadata[key].image} alt={key} />
								<input
									type="number"
									id={key}
									placeholder="0"
									min={0}
									value={spark[key]}
								/>
							</div>
						);
					})}
				</div>
				<div className="spark-input__container__button">
					<button onClick={resetSpark}>Reset</button>
				</div>
				<div className="spark-input__container__result">
					<h3>
						<span>{Math.trunc(calculateSpark())}</span> draws, total of{" "}
						<span>{((calculateSpark() / 300) * 100).toFixed(2)}%</span> of a
						spark
					</h3>
					<div
						className={`spark-input__container__result-progress-bar ${
							calculateSpark() >= 300 ? "filled" : ""
						}`}
					>
						<div
							className="spark-input__container__result-progress-bar__progress"
							style={{
								width: `${(calculateSpark() / 300) * 100}%`,
								backgroundSize: progressBarColorManipulation()
							}}
						/>
						<span className="spark-input__container__result-progress-bar__unit-notation">
							100
						</span>
						<span className="spark-input__container__result-progress-bar__unit-notation">
							200
						</span>
						<img
							src={require("../../../assets/spark/Cerulean_Spark.png")}
							alt="Spark"
						/>
					</div>
				</div>
			</div>
		</FadeIn>
	);
});

export default Spark;

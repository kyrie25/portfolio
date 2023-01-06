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

	const sparkImages = {
		"10Ticket": require("../../../assets/spark/10Ticket.jpg"),
		Ticket: require("../../../assets/spark/Ticket.png"),
		Crystals: require("../../../assets/spark/Crystal.jpg")
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

	return (
		<FadeIn>
			<div className="spark-input__container">
				<h2 className="spark-input__container__title">
					<span>GBF</span> Spark Calculator (WIP)
				</h2>
				<div className="spark-input__input-section">
					{Object.keys(sparkImages).map(key => {
						return (
							<div
								className="spark-input__container__input__item"
								key={key}
								id={key}
								onChange={saveSpark}
							>
								<img src={sparkImages[key]} alt={key} />
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
						You currently have <span>{Math.trunc(calculateSpark())}</span>{" "}
						draws, for a total of{" "}
						<span>{((calculateSpark() / 300) * 100).toFixed(2)}%</span> of a
						spark
					</h3>
				</div>
			</div>
		</FadeIn>
	);
});

export default Spark;

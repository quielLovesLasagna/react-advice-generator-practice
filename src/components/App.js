import { useEffect, useState } from "react";

// API
const ADVICEAPI = "https://api.adviceslip.com/advice";

export default function App() {
	const [advice, setAdvice] = useState("");
	const [adviceID, setAdviceID] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	async function getAdvice() {
		try {
			setIsLoading(true);
			setError("");

			const res = await fetch(ADVICEAPI);

			if (!res.ok) {
				throw new Error("There was a problem fetching the data!");
			}

			const data = await res.json();

			if (data.slip && data.slip.advice) {
				const { advice, id } = data.slip;
				setAdvice(advice);
				setAdviceID(id);
			} else {
				throw new Error("Couldn't get advice, try again later!");
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(function () {
		getAdvice();
	}, []);

	function handleGetAdviceClick() {
		getAdvice();
	}

	const loadingIndicator = isLoading && "Loading...";

	return (
		<main className="main">
			<div className="container">
				<p className="container__advice-num">
					{loadingIndicator}
					{!isLoading && !error && `Advice #${adviceID}`}
					{error && error}
				</p>
				<blockquote className="container__quote">
					{loadingIndicator}
					{!isLoading && !error && `"${advice}"`}
					{error && error}
				</blockquote>
				<img
					src="./images/pattern-divider-desktop.svg"
					alt="divider"
					className="container__divider"
				/>
				<button className="container__dice-box" onClick={handleGetAdviceClick}>
					<img
						src="./images/icon-dice.svg"
						alt="dice"
						className="container__dice-img"
					/>
				</button>
			</div>
		</main>
	);
}

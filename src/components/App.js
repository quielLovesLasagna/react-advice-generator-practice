import { useEffect } from "react";
import { useAdvice } from "./useAdvice";

let getAdviceFunc = null;

function handleGetAdvice() {
	getAdviceFunc();
}

export default function App() {
	const { advice, adviceID, isLoading, error, getAdvice } = useAdvice();
	getAdviceFunc = getAdvice;

	useEffect(() => {
		handleGetAdvice();
	}, []);

	const loadingIndicator = isLoading && "Loading...";
	const errorIndicator = error && error;

	return (
		<main className="main">
			<div className="container">
				<p className="container__advice-num">
					{loadingIndicator}
					{!isLoading && !error && `Advice #${adviceID}`}
					{errorIndicator}
				</p>
				<blockquote className="container__quote">
					{loadingIndicator}
					{!isLoading && !error && `"${advice}"`}
					{errorIndicator}
				</blockquote>
				<img
					src="./images/pattern-divider-desktop.svg"
					alt="divider"
					className="container__divider"
				/>
				<button className="container__dice-box" onClick={handleGetAdvice}>
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

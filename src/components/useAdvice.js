import { useState } from "react";

// API
const ADVICEAPI = "https://api.adviceslip.com/advice";

export function useAdvice() {
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

	return { advice, adviceID, isLoading, error, getAdvice };
}

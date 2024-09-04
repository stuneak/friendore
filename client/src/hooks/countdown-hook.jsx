import { useState, useEffect } from 'react';
import humanize from 'humanize-duration';

const formatTime = ({
	days,
	hours,
	minutes,
	secondsRemaining,
	isEnd,
}) => {
	if (isEnd) {
		return "-"
	}
	if (days > 0) {
		return humanize(secondsRemaining, { units: ['d'], round: true });
	}

	if (hours > 0) {
		return humanize(secondsRemaining, { units: ["h"], round: true });
	}

	if (minutes > 0) {
		return humanize(secondsRemaining, { units: ['m'], round: true });
	}

	return humanize(secondsRemaining, { units: ['s'], round: true });
};

export function useCountdown(inputDate, onDestroy) {
	const TARGET_DATE = new Date(inputDate);
	// Initialize the state with the time remaining
	function getTimeRemaining() {
		const now = new Date();
		const timeDifference = TARGET_DATE - now;

		if (timeDifference <= 0) {
			onDestroy?.();
			return {
				isEnd: true,
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
				secondsRemaining: 0,
			};
		}

		const seconds = Math.floor(timeDifference / 1000) % 60;
		const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
		const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
		const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

		const secondsRemaining = Math.floor(timeDifference); // Divide by 1000 to get seconds

		return { secondsRemaining, isEnd: false, days, hours, minutes, seconds };
	}

	const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

	useEffect(() => {
		// Function to update the countdown
		let intervalId = null;
		const updateCountdown = () => {
			const newTimeRemaining = getTimeRemaining();
			if (newTimeRemaining.hasEnd) {
				clearInterval(intervalId);
				return;
			}
			setTimeRemaining(getTimeRemaining());
		};

		// Update countdown every second
		intervalId = setInterval(updateCountdown, 1000);

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	// Extract the values from the state
	const { days, hours, minutes, isEnd, secondsRemaining } =
		timeRemaining;

	const formattedText = formatTime({
		days,
		hours,
		minutes,
		secondsRemaining,
		isEnd,
	});


	return { formattedText, isEnd };
}

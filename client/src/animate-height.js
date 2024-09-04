export function animateHeight(element, startHeight, endHeight, duration) {
	const startTime = performance.now(); // Start time
	const difference = startHeight - endHeight;

	function step(currentTime) {
		const elapsedTime = currentTime - startTime;
		const progress = Math.min(elapsedTime / duration, 1); // Normalize progress (0 to 1)

		// Calculate current height based on the progress
		const currentHeight = startHeight - progress * difference;

		// Apply current height to the element
		element.style.height = currentHeight + 'px';

		// Continue animation if progress is not 100%
		if (progress < 1) {
			requestAnimationFrame(step);
		} else {
			// Ensure the final height is set to endHeight at the end
			element.style.height = endHeight + 'px';
		}
	}

	requestAnimationFrame(step);
}

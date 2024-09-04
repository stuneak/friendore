/* eslint-disable no-nested-ternary */
import React from 'react';

export const parseLinks = (socials) => {
	const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
	const phonePattern = /\+?[0-9\s\-()]{7,}/;
	const urlPattern =
		/(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/;

	const wrapper = (content, id) => (
		<span key={id}>
			{content}
			<span> </span>
		</span>
	);

	const results = [];

	socials.forEach((line) => {
		line = line.trim();
		if (emailPattern.test(line)) {
			results.push(
				wrapper(
					<a
						className="cursor-pointer font-medium text-blue-600 underline hover:no-underline"
						href={`mailto:${line}`}
					>
						{line};
					</a>,
					line
				)
			);
		} else if (phonePattern.test(line)) {
			results.push(
				wrapper(
					<a
						className="cursor-pointer font-medium text-blue-600 underline hover:no-underline"
						href={`tel:${line.replace(/\s+/g, '')}`}
					>
						{line};
					</a>,
					line
				)
			);
		} else if (urlPattern.test(line)) {
			const url = line.startsWith('http') ? line : `https://${line}`;
			results.push(
				wrapper(
					<a
						className="cursor-pointer font-medium text-blue-600 underline hover:no-underline"
						href={url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{line};
					</a>,
					line
				)
			);
		} else {
			results.push(wrapper(<span>{line};</span>, line));
		}
	});

	return results;
};
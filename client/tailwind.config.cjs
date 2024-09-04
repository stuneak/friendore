const highlights = require('tailwindcss-highlights');

module.exports = {
	content: ['./src/**/*.{js,jsx}', './public/index.html'],
	theme: {
		extend: {
			colors: {
				primary: '#1B73E8',
			},
			margin: {
				'5px': '5px',
			},
		},
		fontFamily: {
			serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
		},
	},
	plugins: [highlights],
};

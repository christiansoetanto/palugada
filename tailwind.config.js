module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			minHeight: {
				0: "0",
				"6rem": "6rem",
				"3rem": "3rem",
				"2rem": "2rem",
			},
			minWidth: {
				0: "0",
				"1/4": "25%",
				"1/2": "50%",
				"3/4": "75%",
				full: "100%",
			},
			maxWidth: {
				0: "0",
				"1/4": "25%",
				"1/2": "50%",
				"3/4": "75%",
				full: "100%",
			},
			screens: {
				xlMax: { max: "1279px" },
				// => @media (max-width: 1279px) { ... }

				lgMax: { max: "1023px" },
				// => @media (max-width: 1023px) { ... }

				mdMax: { max: "767px" },
				// => @media (max-width: 767px) { ... }

				smMax: { max: "639px" },
				// => @media (max-width: 639px) { ... }
			},
			colors: {
				dimGray: "#6d676e",
				richBlack: "#0a0908",
				isabelline: "#f8edeb",
				copper: "#b87333",
				peach: "#fec89a",
			},
		},
	},
	plugins: [],
};

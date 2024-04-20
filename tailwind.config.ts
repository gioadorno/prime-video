import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			animation: {
				fadeOut: "fadeOut 3s ease-out",
				rotateUp: "rotateUp .5s",
				rotateDown: "rotateDown .5s",
				slideUp: "slideUp 1s",
				slideDown: "slideDown 1s",
				slideLeft: "slideLeft 1s",
				slightRight: "slideright 1s",
			},
			animationDirection: {
				forwards: "forwards",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"primary-color": "#00a3db",
				"secondary-500": "#FFB620",
				blue: "#0095F6",
				"logout-btn": "#FF5A5A",
				"navbar-menu": "#000010",
				"dark-1": "#000006",
			},
			gridTemplateColumns: {
				"3-split": "75px 1fr 75px",
			},
			gradientColorStopPositions: {
				55: "55%",
			},
			keyframes: {
				fadeOut: {
					"0%": { backgroundColor: "#000010", top: "0", width: "100%" },
					"100%": { backgroundColor: "#00001000", top: "12px", width: "300px" },
				},
				rotateUp: {
					"0%": { transform: "rotate(-180deg)" },
					"100%": { transform: "rotate(0deg)" },
				},
				rotateDown: {
					"0%": { transform: "rotate(180deg)" },
					"100%": { transform: "rotate(0deg)" },
				},
				slideUp: {
					from: {
						visibility: "visible",
						transform: "translate3d(0, 0, 0)",
						opacity: "1",
					},
					to: {
						visibility: "hidden",
						transform: "translate3d(0, -100%, 0)",
						opacity: "0",
					},
				},
				slideDown: {
					from: {
						visibility: "hidden",
						transform: "translate3d(0, -100%, 0)",
						opacity: "0",
					},
					to: {
						visibility: "visible",
						transform: "translate3d(0, 0, 0)",
						opacity: "1",
					},
				},
				slideLeft: {
					from: {
						visibility: "hidden",
						transform: "translate3d(100%, 0, 0)",
						opacity: "0",
					},
					to: {
						visibility: "visible",
						transform: "translate3d(0, 0, 0)",
						opacity: "1",
					},
				},
				slideRight: {
					from: {
						visibility: "visible",
						transform: "translate3d(0, 0, 0)",
						opacity: "1",
					},
					to: {
						visibility: "hidden",
						transform: "translate3d(100%, 0, 0)",
						opacity: "0",
					},
				},
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
export default config;

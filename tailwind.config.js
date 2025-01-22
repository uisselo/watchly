/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			colors: {
				primary: "#EF101D",
				secondary: "#EF7210",
			}
		},
    container: {
			center: true,
			screens: {
				sm: "420px",
				md: "744px",
				lg: "1024px",
				xl: "1440px",
			},
			minWidth: "375px",
			maxWidth: "1440px",
			padding: {
				DEFAULT: "16px",
				sm: "16px",
				md: "32px",
				lg: "32px",
				xl: "104px",
			},
		},
  },
  plugins: [],
}


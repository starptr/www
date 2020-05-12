import Typography from "typography";
import oceanBeachTheme from "typography-theme-ocean-beach";

const theme = {
	title: "Cool",
	baseFontSize: "20px",
	baseLineHeight: 1.5,
	googleFonts: [
		{
			name: "Montserrat",
			styles: ["400", "400i", "600", "600i", "700", "700i"],
		},
		{
			name: "Open Sans",
			styles: ["400", "400i", "700", "700i"],
		},
	],
	headerFontFamily: ["Montserrat", "sans-serif"],
	bodyFontFamily: ["Open Sans", "serif"],
	headerGray: 20,
	headerGrayHue: 0,
	bodyGray: 20,
	bodyGrayHue: 0,
	headerWeight: "600",
	bodyWeight: "normal",
	boldWeight: "bold",
	//blockMarginBottom: 0,
	overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options, styles) => {
		const linkColor = "#4078c0";
		return {
			a: {
				color: linkColor,
			},
			"a:link": {
				textDecoration: "none",
			},
			"a:hover,a:active": {
				textDecoration: "underline",
			},
			"li>ul,li>ol": {
				marginLeft: "20px",
				marginTop: 0,
			},
			"ul li,ol li": {
				marginBottom: 0,
			},
			blockquote: {
				...scale(1 / 5),
				borderLeft: `${rhythm(3 / 16)} solid #595959`,
				color: `#595959`,
				paddingLeft: rhythm(10 / 16),
				fontStyle: "italic",
				marginLeft: 0,
				marginRight: 0,
			},
			"blockquote cite": {
				...adjustFontSizeTo(options.baseFontSize),
				color: options.bodyColor,
				fontStyle: "normal",
				fontWeight: options.bodyWeight,
			},
			"blockquote cite:before": {
				content: '"— "',
			},
		};
	},
};

const typography = new Typography(theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
	typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;

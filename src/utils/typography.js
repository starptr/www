import Typography from "typography";
import oceanBeachTheme from "typography-theme-ocean-beach";

/*
import Wordpress2016 from "typography-theme-wordpress-2016";
Wordpress2016.overrideThemeStyles = () => {
	return {
		"a.gatsby-resp-image-link": {
			boxShadow: `none`,
		},
	};
};

delete Wordpress2016.googleFonts;
*/

const theme = {
	title: "Cool",
	baseFontSize: "20px",
	baseLineHeight: 1.5,
	scaleRatio: 2,
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
	blockMarginBottom: 0,
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
				textDecoration: "solid",
			},
			"h1,h2,h3,h4,h5,h6": {
				marginTop: rhythm(1.5),
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

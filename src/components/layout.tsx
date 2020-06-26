import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import type { WindowLocation } from "@reach/router";

import Link from "./Link";
import { rhythm, scale } from "../utils/typography";

import ampersandSrc from "../../content/assets/ampersand-symbol.svg"; //From https://www.freepik.com/free-icon/ampersand_697225.htm#page=1&query=ampersand&position=35

type Args = {
	location: WindowLocation<{} | null | undefined>;
	title?: string;
	children: React.ReactNode;
};

const Layout: React.FC<Args> = ({ location, title, children }) => {
	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);

	let layoutTitle = title || (
		<>
			<img
				src={ampersandSrc}
				alt="\&"
				style={{
					height: rhythm(1.5),
					marginLeft: rhythm(-0.32),
					marginRight: rhythm(-0.27),
					marginBottom: 0,
				}}
			/>
			{data.site.siteMetadata.title.slice(1)}
		</>
	);

	const tabs = [
		{
			title: layoutTitle,
			to: `/`,
		},
		{
			title: `Post[]`,
			to: `/blog`,
		},
	];

	let header = (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				marginBottom: rhythm(1.25),
			}}
		>
			{tabs.map((tab, index) => {
				const isFirst = index === 0;
				const isHere = location.pathname === tab.to;

				return React.createElement(
					isFirst ? "h1" : "h3",
					{
						style: {
							...(isFirst && scale(1.5)),
							marginTop: 0,
							marginRight: rhythm(2),
							marginBottom: 0,
						},
					},
					React.createElement(
						isHere ? "p" : Link,
						{
							style: {
								color: `inherit`,
								marginBottom: 0,
								...(!isFirst &&
									isHere && {
										textDecoration: `underline`,
									}),
							},
							to: tab.to,
						},
						tab.title
					)
				);
			})}
		</div>
	);

	return (
		<div
			style={{
				marginLeft: `auto`,
				marginRight: `auto`,
				maxWidth: rhythm(24),
				padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
			}}
		>
			<header>{header}</header>
			<main>{children}</main>
			<footer
				style={{
					marginTop: `${rhythm(1.5)}`,
				}}
			>
				© {new Date().getFullYear()}, Built with
				{` `}
				<a href="https://www.gatsbyjs.org">Gatsby</a>.
			</footer>
		</div>
	);
};

export default Layout;

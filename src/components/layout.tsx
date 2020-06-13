import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import type { WindowLocation } from "@reach/router";

import Link from "./Link";
import { rhythm, scale } from "../utils/typography";

type Args = {
	location: any;
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

	let layoutTitle = title || data.site.siteMetadata.title;

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

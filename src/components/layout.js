import React from "react";

import Link from "../components/Link";
import { rhythm, scale } from "../utils/typography";

const Layout = ({ location, title, children }) => {
	const rootPath = `${__PATH_PREFIX__}/`;
	let header;

	const tabs = [
		{
			title,
			to: `/`,
		},
		{
			title: `Post[]`,
			to: `/blog`,
		},
	];

	//if (location.pathname === rootPath) {
	if (true) {
		header = (
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
									...(!isFirst && isHere && {
										textDecoration: `underline`,
									}),
								},
								to: tab.to,
							},
							tab.title
						)
					);

					if (index === 0) {
						return (
							<h1
								style={{
									...scale(1.5),
									marginTop: 0,
									marginRight: rhythm(1.5),
								}}
							>
								<Link
									style={{
										color: `inherit`,
										...(location.pathname === tab.to && {
											textDecoration: `underline`,
										}),
									}}
									to={tab.to}
								>
									{tab.title}
								</Link>
							</h1>
						);
					} else {
						return (
							<h2
								style={{
									marginTop: 0,
									marginRight: rhythm(1.5),
								}}
							>
								<Link
									style={{
										color: `inherit`,
										...(location.pathname === tab.to && {
											textDecoration: `underline`,
										}),
									}}
									to={tab.to}
								>
									{tab.title}
								</Link>
							</h2>
						);
					}
				})}
			</div>
		);
	} else {
		header = (
			<h3
				style={{
					fontFamily: `Montserrat, sans-serif`,
					marginTop: 0,
				}}
			>
				<Link
					style={{
						color: `inherit`,
					}}
					to={`/`}
				>
					{title}
				</Link>
			</h3>
		);
	}
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

import React from "react";

import Link from "../components/Link";
import { rhythm, scale } from "../utils/typography";

const Layout = ({ location, title, children }) => {
	const rootPath = `${__PATH_PREFIX__}/`;
	let header;

	//if (location.pathname === rootPath) {
	if (true) {
		header = (
			<div
				style={{
					display: "flex",
				}}
			>
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
						}}
						to={`/`}
					>
						{title}
					</Link>
				</h1>
				<h2>
					test
				</h2>
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

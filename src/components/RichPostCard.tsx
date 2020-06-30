import React from "react";
import { graphql } from "gatsby";
import type { PageProps } from "gatsby";

import Bio from "./bio";
import Layout from "./layout";
import SEO from "./seo";
import SmallBoxed from "./SmallBoxed";
import Link from "./Link";
import Tags from "./Tags";
import { rhythm } from "../utils/typography";

type Args = {
	slug: string;
	title: string;
	date: string;
	tags: string[];
	description: string;
	excerpt: string;
};

const RichPostCard: React.FC<Args> = props => (
	<article key={props.slug}>
		<header>
			<h3
				style={{
					marginTop: rhythm(1.5),
					marginBottom: 0,
				}}
			>
				<Link to={props.slug}>{props.title}</Link>
			</h3>
			<div
				style={{
					marginTop: rhythm(1 / 8),
					marginBottom: rhythm(1 / 8),
				}}
			>
				<p style={{ marginBottom: 0, display: "inline" }}>{props.date}</p>
				<Tags showSeparator tags={props.tags} />
			</div>
		</header>
		<section>
			<p
				dangerouslySetInnerHTML={{
					__html: props.description || props.excerpt,
				}}
			/>
		</section>
	</article>
);

export default RichPostCard;

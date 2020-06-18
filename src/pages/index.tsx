import React from "react";
import { graphql } from "gatsby";
import type { PageProps } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import SmallBoxed from "../components/SmallBoxed";
import Home from "../components/Home";
import Blog from "../components/Blog";
import Link from "../components/Link";
import { rhythm } from "../utils/typography";

type Data = {
	site: {
		siteMetadata: {
			title: string;
			author: {
				name: string;
			};
			blog: {
				title: string;
			};
		};
	};
};

const Index = (props: PageProps<Data>) => {
	const siteTitle = props.data.site.siteMetadata.title;
	const name = props.data.site.siteMetadata.author.name;
	const blogTitle = props.data.site.siteMetadata.blog.title;
	return (
		<Layout location={props.location}>
			<SEO title="Home" />
			<p>
				👋Hi!! Welcome to <Home />. I'm <strong>{name}</strong>, and since I like to make things, this page lists some things I've made.
			</p>
			<p>Some interesting things I'm actively working on:</p>
			<ul>
				<li>
					<strong>
						<Link to="/">This website.</Link>
					</strong>{" "}
					It's far from polished, and eventually I'd like to put most of my work here.
				</li>
				<li>
					<strong>
						<Link to="/22to7/amc-lp">22to7 – AMC: Let's Play!</Link>
					</strong>{" "}
					Set of weekly livestreams where I solve past AMC problems, taking questions live.
				</li>
			</ul>
			<p>Projects that I consider completed and done:</p>
			<ul>
				<li>
					<strong>
						<a href="http://eartrain.surge.sh/">Eartrain.</a>
					</strong>{" "}
					A webapp that tests one's ability to identity notes from listening to random pitches in succession. Using a special
					notation for half-flats and half-sharps, every octave contains 24 different pitches to be selected from.
				</li>
				<li>
					<strong>
						<a href="http://22to7.surge.sh/">22to7 – Prosol.</a>
					</strong>{" "}
					A 3-day mini math camp I did to introduce advanced mathematics problem solving skills to middle schoolers.
				</li>
			</ul>
			<p>These are currently on a hiatus:</p>
			<ul>
				<li>
					<strong>
						<a href="https://www.npmjs.com/package/classical-music-tagger">CMT 2.</a>
					</strong>{" "}
					A tool to organize the metadata of classical music tracks, now with a clean database of compositions.
				</li>
			</ul>
		</Layout>
	);
};

export default Index;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
				author {
					name
				}
				blog {
					title
				}
			}
		}
	}
`;

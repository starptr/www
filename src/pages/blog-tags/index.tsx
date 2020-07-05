import React from "react";
import { graphql } from "gatsby";
import type { PageProps } from "gatsby";

import Bio from "../../components/bio";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import SmallBoxed from "../../components/SmallBoxed";
import Link from "../../components/Link";
import Tags from "../../components/Tags";
import RichPostCard from "../../components/RichPostCard";
import { rhythm } from "../../utils/typography";

type Data = {
	site: {
		siteMetadata: {
			title: string;
			blog: {
				title: string;
			};
			author: {
				name: string;
			};
		};
	};
	allMdx: {
		edges: {
			node: {
				excerpt: string;
				frontmatter: {
					title: string;
					date: string;
					description: string;
					tags: string[];
				};
				fields: {
					slug: string;
				};
			};
		}[];
	};
};

const TagsIndex = ({ data, location }: PageProps<Data>) => {
	const posts = [...data.allMdx.edges];
	const author = data.site.siteMetadata.author.name;
	console.log("copy:", posts);

	const tags = new Map<string, number>();
	posts.forEach(({ node }) =>
		node.frontmatter.tags.forEach(tagStr => tags.set(tagStr, tags.has(tagStr) ? (tags.get(tagStr) as number) + 1 : 1))
	);
	const tagsSorted = [...tags].sort((a: [string, number], b: [string, number]) => (a[0] > b[0] ? 1 : -1));

	return (
		<Layout location={location}>
			<SEO title="All posts" description={`Streaming direct thought dumps from ${author}.`} />
			<h1
				style={{
					marginTop: rhythm(1),
					marginBottom: 0,
				}}
			>
				All Tags
			</h1>
			<ul>
				{tagsSorted.map(tagCtPair => (
					<li>{`${tagCtPair[0]} (${tagCtPair[1]})`}</li>
				))}
			</ul>
			<Bio
				style={{
					marginTop: rhythm(1.25),
					marginBottom: rhythm(1.5),
				}}
			/>
		</Layout>
	);
};

export default TagsIndex;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
				blog {
					title
				}
				author {
					name
				}
			}
		}
		allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM D, Y · H:mm a")
						title
						description
						tags
					}
				}
			}
		}
	}
`;

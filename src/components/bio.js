/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import NowPlaying from "./NowPlaying";
import { rhythm } from "../utils/typography";

const Bio = props => {
	const data = useStaticQuery(graphql`
		query BioQuery {
			avatar: file(absolutePath: { regex: "/profile-pic-4.jpg/" }) {
				childImageSharp {
					fixed(width: 50, height: 50, quality: 100) {
						...GatsbyImageSharpFixed
					}
				}
			}
			site {
				siteMetadata {
					author {
						name
					}
					social {
						twitter
						instagram
						linkedin
					}
				}
			}
		}
	`);

	const { author, social } = data.site.siteMetadata;
	return (
		<div>
			<div
				style={{
					display: `flex`,
					alignItems: `center`,
					...props.style,
				}}
			>
				<Image
					fixed={data.avatar.childImageSharp.fixed}
					alt={author.name}
					style={{
						marginRight: rhythm(1 / 2),
						marginBottom: 0,
						minWidth: 50,
						borderRadius: `30%`,
					}}
					imgStyle={{
						borderRadius: `30%`,
						marginBottom: 0,
					}}
				/>
				<p
					style={{
						marginBottom: 0,
					}}
				>
					Streaming direct thought dumps from <strong>{author.name}</strong>.
					<br />
					Connect with me on{" "}
					<a href={`https://www.linkedin.com/in/${social.linkedin}`}>LinkedIn</a>! I'm
					currently listening to:
				</p>
			</div>
			<NowPlaying style={{ marginBottom: rhythm(1) }} />
		</div>
	);
};

export default Bio;

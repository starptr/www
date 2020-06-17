import React from "react";
import { graphql } from "gatsby";
import type { PageProps } from "gatsby";

import SEO from "../../../components/seo";
import Layout from "../../../components/layout";
import { rhythm } from "../../../utils/typography";

type Data = {
	site: {
		siteMetadata: {
			title: string;
		};
	};
};

const Index = (props: PageProps<Data>) => {
	const siteTitle = props.data.site.siteMetadata.title;
	const title = "AMC: Let's Play!";

	return (
		<Layout location={props.location} title={siteTitle}>
			<SEO title={title} description="Learn some cool math tricks." />
			<h1>{title}</h1>
			<p>
				Welcome! Here, you will find the latest scheduling of <strong>{title}</strong> livestreams.
			</p>
			<iframe
				src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FLos_Angeles&amp;src=a2luaXVzZWQyc2psZTVkY2J0dmJnOWdiNWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23E67C73&amp;showTitle=0&amp;showNav=1&amp;showDate=0&amp;showPrint=0&amp;showTabs=1&amp;showCalendars=1&amp;showTz=1"
				width="100%"
				height="600"
				scrolling="no"
				style={{
					borderWidth: 0,
				}}
			/>
			<p
				style={{
					color: "red",
				}}
			>
				Heads up! The info below may be old. If there is any inconsistency between the calendar above and the rest of the page, the
				calendar is probably right.
			</p>
			<p>I encourage you all to try every problem before the streams :).</p>
			<p>
				Join the call: <a href="https://meet.google.com/eyb-qyvq-nvk">Google Meet (eyb-qyvq-nvk)</a>
			</p>
			<table>
				<thead>
					<tr>
						<td>Homework</td>
						<td>By Date</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<p style={{ color: "lightgray", marginBottom: 0 }}>None</p>
						</td>
						<td>June 8</td>
					</tr>
					<tr>
						<td>
							<a href="https://artofproblemsolving.com/wiki/index.php/2000_AMC_10_Problems">AMC 10 2000</a>
						</td>
						<td>June 16</td>
					</tr>
					<tr>
						<td>
							<a href="https://artofproblemsolving.com/wiki/index.php/2001_AMC_10_Problems">AMC 10 2001</a> #1-15
						</td>
						<td>June 23</td>
					</tr>
				</tbody>
			</table>
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

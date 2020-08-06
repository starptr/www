import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";
import axios from "axios";
import type CSS from "csstype";
import type * as NP from "./NP";
import NPInternalComponent from "./NPInternalComponent";

type Args = {
	apiURL?: string;
	style?: CSS.Properties;
};

const NowPlaying: React.FC<Args> = props => {
	const gdata = useStaticQuery(graphql`
		query NowPlayingQuery {
			site {
				siteMetadata {
					npApiUrl
				}
			}
		}
	`);
	const { npApiUrl } = gdata.site.siteMetadata;

	const [npData, setNpData] = useState<NP.NpData>(null);
	const [playState, setPlayState] = useState<NP.PlayState>("loading");

	useEffect(() => {
		const periodicReq = setInterval(async () => {
			await axios
				.get<{
					is_not_playing?: boolean;
					item?: {
						name: string;
						external_urls: {
							spotify: string;
						};
						artists: {
							name: string;
							external_urls: {
								spotify: string;
							};
						}[];
						album: {
							name: string;
							external_urls: {
								spotify: string;
							};
							images: {
								url: string;
							}[];
						};
						duration_ms: number;
					};
					progress_ms?: number;
					is_playing?: boolean;
					error?: string;
				}>(props.apiURL || npApiUrl, {
					timeout: 5000,
				})
				.then(res => {
					const { data } = res;
					if (data.error) {
						setPlayState(() => "token-error");
					} else if (data.is_not_playing || !data.item) {
						setPlayState(() => "not-playing");
						setNpData(() => null);
					} else {
						setPlayState(() => "playing");

						let transformedData = {
							title: {
								value: data.item?.name,
								url: data.item?.external_urls.spotify,
							},
							artist: data.item?.artists.map(artist => ({
								value: artist.name,
								url: artist.external_urls.spotify,
							})),
							album: {
								value: data.item?.album.name,
								url: data.item?.album.external_urls.spotify,
							},
							cover: data.item?.album.images[0].url,
							time: {
								progress: data.progress_ms,
								duration: data.item?.duration_ms,
							},
							is_playing: data.is_playing,
						};

						setNpData(() => (transformedData as unknown) as NP.NpData);
					}
				})
				.catch(err => {
					setPlayState(() => "timeout");
					console.error(err);
				});
		}, 1000);
		return () => clearInterval(periodicReq);
	}, []);

	return <NPInternalComponent playState={playState} data={npData} style={props.style} />;
};

export default NowPlaying;

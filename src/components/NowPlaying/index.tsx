import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import axios from "axios";

type NpData = {
	title: {
		value: string;
		url: string;
	};
	artist: {
		value: string;
		url: string;
	}[];
	album: {
		value: string;
		url: string;
	};
	cover: string;
	time: {
		//measured in ms
		progress: number;
		duration: number;
	};
	is_playing: boolean;
} | null;

type Args = {
	apiURL: string;
};

const NowPlaying: React.FC<Args> = props => {
	const [npData, setNpData] = useState<NpData>(null);

	useEffect(() => {
		const periodicReq = setInterval(() => {
			axios
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
				}>(props.apiURL)
				.then(res => {
					const { data } = res;
					if (data.is_not_playing) {
						setNpData(() => null);
					} else {
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

						setNpData(() => (transformedData as unknown) as NpData);
					}
				})
				.catch(err => {
					console.error(err);
				});
		}, 1000);
		return () => clearInterval(periodicReq);
	}, []);

	if (npData) {
		return (
			<div>
				<p>{npData.title.value}</p>
				<p>{npData.artist[0].value}</p>
				<p>{npData.album.value}</p>
				<p>
					{npData.time.progress / 1000} / {npData.time.duration / 1000}
				</p>
			</div>
		);
	} else {
		return <div>npData is null</div>;
	}
};

export default NowPlaying;

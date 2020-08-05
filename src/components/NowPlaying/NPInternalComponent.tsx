import React, { useState, useEffect } from "react";
import { rhythm } from "../../utils/typography";
import type * as NP from "./NP";
import type CSS from "csstype";

import SpotifyIconSrc from "./spotify.svg";

const ICON_RHYTHM_SIZE = 3;

const msToMinutesSeconds = (ms: number) => {
	let min = Math.floor(ms / 60000);
	let sec = `0${((ms % 60000) / 1000).toFixed(0)}`.slice(-2);
	return `${min}:${sec}`;
};

type Args = {
	playState: NP.PlayState;
	data: NP.NpData;
	style?: CSS.Properties;
};

const NPInternalComponent: React.FC<Args> = props => {
	let isPlaying = props.playState === "playing";
	return (
		<div
			style={{
				color: "white",
				backgroundColor: "#1f1f1f",
				padding: rhythm(0.7),
				paddingBottom: rhythm(0.1),
				...(props.style as CSS.Properties),
			}}
		>
			<div
				style={{
					display: "flex",
				}}
			>
				<img
					style={{
						display: "inline",
						width: rhythm(ICON_RHYTHM_SIZE),
						height: rhythm(ICON_RHYTHM_SIZE),
						marginBottom: 0,
						marginRight: rhythm(1),
					}}
					src={isPlaying ? props.data?.cover : SpotifyIconSrc}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					{isPlaying ? (
						<>
							{" "}
							<small>
								<a style={{ color: "white" }} href={props.data?.title.url}>
									<strong>{props.data?.title.value}</strong>
								</a>
							</small>
							<small>
								{props.data?.artist.map((artist, index) => (
									<>
										{index === 0 ? "by " : ", "}
										<a style={{ color: "white" }} href={artist.url}>
											{artist.value}
										</a>
									</>
								))}
							</small>
							<small>
								on{" "}
								<a style={{ color: "white" }} href={props.data?.album.url}>
									{props.data?.album.value}
								</a>
							</small>
						</>
					) : props.playState === "not-playing" ? (
						"Nothing is playing."
					) : props.playState === "timeout" ? (
						"Connection timed out."
					) : props.playState === "loading" ? (
						"Loading…"
					) : (
						"Token error!"
					)}
				</div>
			</div>
			<div
				style={{
					backgroundColor: "#5a5a5a",
					height: "4px",
				}}
			>
				<div
					style={{
						backgroundColor: "white",
						height: "4px",
						width: isPlaying
							? `${
									((props.data?.time.progress as number) /
										(props.data?.time.duration as number)) *
									100
							  }%`
							: 0,
					}}
				/>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<small>
					{isPlaying
						? `${msToMinutesSeconds(props.data?.time.progress as number)}${
								!props.data?.is_playing ? " (Paused)" : ""
						  }`
						: "0:00"}
				</small>
				<small>
					{isPlaying ? msToMinutesSeconds(props.data?.time.duration as number) : "0:00"}
				</small>
			</div>
		</div>
	);
};

export default NPInternalComponent;

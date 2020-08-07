import React, { useState, useEffect } from "react";
import Marquee from "react-marquee";

import { rhythm } from "../../utils/typography";
import type * as NP from "./NP";
import type CSS from "csstype";

import SpotifyIconSrc from "./spotify.svg";

const ICON_RHYTHM_SIZE = 3;
const GAP_RHYTHM_SIZE = 1;

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
			style={
				{
					color: "white",
					backgroundColor: "#1f1f1f",
					padding: rhythm(0.7),
					paddingBottom: rhythm(0.1),
					...(props.style as CSS.Properties),
				} as React.CSSProperties
			}
		>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `${rhythm(ICON_RHYTHM_SIZE)} calc(100% - ${rhythm(
						ICON_RHYTHM_SIZE + GAP_RHYTHM_SIZE
					)})`,
					gridColumnGap: rhythm(GAP_RHYTHM_SIZE),
					alignContent: "center",
				}}
			>
				<img
					style={{
						gridRow: "1 / 4",
						width: rhythm(ICON_RHYTHM_SIZE),
						height: rhythm(ICON_RHYTHM_SIZE),
						marginBottom: 0,
					}}
					src={isPlaying ? props.data?.cover : SpotifyIconSrc}
				/>
				{isPlaying ? (
					<>
						{" "}
						<small style={{ alignSelf: "end", marginBottom: rhythm(-0.15) }}>
							<Marquee
								text={
									<span title="">
										<a style={{ color: "white" }} href={props.data?.title.url}>
											<strong>{props.data?.title.value}</strong>
										</a>
									</span>
								}
							/>
						</small>
						<small style={{ alignSelf: "center" }}>
							<Marquee
								text={props.data?.artist.map((artist, index) => (
									<span title="">
										{index === 0 ? "by " : ", "}
										<a style={{ color: "white" }} href={artist.url}>
											{artist.value}
										</a>
									</span>
								))}
							/>
						</small>
						<small
							style={{ alignSelf: "start", marginTop: rhythm(-0.15), width: "100%" }}
						>
							<Marquee
								text={
									<span title="">
										on{" "}
										<a style={{ color: "white" }} href={props.data?.album.url}>
											{props.data?.album.value}
										</a>
									</span>
								}
							/>
						</small>
					</>
				) : (
					<div
						style={{
							gridRow: "1 / 4",
							alignSelf: "center",
						}}
					>
						{props.playState === "not-playing"
							? "Nothing is playing."
							: props.playState === "timeout"
							? "Connection could not be made."
							: props.playState === "loading"
							? "Loading…"
							: "Token error!"}
					</div>
				)}
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

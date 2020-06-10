import React from "react";
import Loadable from "@loadable/component"
import { create, all } from "mathjs";
const MathJS = create(all, {});

const Plot = Loadable(() => import('react-plotly.js'));

const Index = props => {
	const xVals = MathJS.range(0, 7, 0.01).toArray();

	return (
		<Plot
			data={[
				{
					x: xVals,
					y: xVals.map(x => x / 10),
					type: "scatter",
					mode: "lines",
					marker: { color: "blue" },
				},
			]}
			layout={{
				width: 640,
				height: 480,
				title: "Haha my title here",
				showlegend: true,
				hovermode: "closest",
				clickmode: "select",
				//Prevent zooming in by dragging a rectangle on default
				dragmode: "select",
				//Max dist to display coordinates
				hoverdistance: 40,
				spikedistance: 40,
				yaxis: {
					visible: true,
					color: "green",
					rangemode: "nonnegative",
				},
				xaxis: {
					visible: true,
					color: "green",
					title: {
						text: "xaxis title here"
					},
					rangemode: "nonnegative",
				},
			}}
			config={{}}
		/>
	);
};

export default Index;

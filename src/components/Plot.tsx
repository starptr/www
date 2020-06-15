import React from "react";
import Loadable from "@loadable/component";

const Plot = Loadable(() => import("react-plotly.js"));

const MyPlot = (props: any) => {
	return (
		<Plot
			data={props.data}
			layout={{
				showlegend: true,
				hovermode: "closest",
				clickmode: "select",
				dragmode: "select",
				hoverdistance: 40,
				spikedistance: 40,
				...props.layout,
			}}
			config={props.config}
			style={props.style}
		/>
	);
};

export default MyPlot;

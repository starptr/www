import React from "react";
import Plot from "react-plotly.js";

const MyPlot = props => {
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
		/>
	);
};

export default MyPlot;

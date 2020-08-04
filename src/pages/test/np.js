import React from "react";
import NowPlaying from "../../components/NowPlaying";

const Np = props => {
	return (
		<>
			<div>hi</div>
			<NowPlaying apiURL="http://52.12.91.203/now-playing" />
		</>
	);
};

export default Np;

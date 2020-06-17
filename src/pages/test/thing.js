import React from "react";

let someData = 5;

export default props => {
	return (
		<>
			<button onClick={() => someData = 10}>increment</button>
			<div>Hello</div>
		</>
	);
};

export { someData };

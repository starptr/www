import React, { useState } from "react";
import { create, all } from "mathjs";
import Plot from "../../../components/Plot";

const MathJS = create(all, {});

const Index = props => {
	const [xStart, setXStart] = useState(-5);
	const [xEnd, setXEnd] = useState(5);
	const [xDelta, setXDelta] = useState(1);

	const [eq, setEq] = useState("sin(x)");

	let xVals = [];
	let yVals = [];
	try {
		xVals = MathJS.range(xStart, xEnd, xDelta, true).toArray();
		const expr = MathJS.compile(eq);
		yVals = xVals.map(x => expr.evaluate({ x: x }));
	} catch (e) {
		console.log(e);
		yVals = [];
	}

	return (
		<div>
			<form>
				<p>
					<label>
						Equation:
						<input type="text" value={eq} onChange={e => setEq(e.target.value)} />
					</label>
				</p>
				<p>
					<label>
						Left bound (inclusive):
						<input
							type="number"
							value={xStart}
							onChange={e => setXStart(e.target.value)}
						/>
					</label>
				</p>
				<p>
					<label>
						Right bound (inclusive):
						<input type="number" value={xEnd} onChange={e => setXEnd(e.target.value)} />
					</label>
				</p>
				<p>
					<label>
						Space between every value of x:
						<input
							type="number"
							value={xDelta}
							onChange={e => setXDelta(e.target.value)}
						/>
					</label>
				</p>
			</form>
			<Plot
				data={[
					{
						x: xVals,
						//y: xVals.map(x => expr.evaluate({ x: x })),
						y: yVals,
						type: "scatter",
						mode: "lines",
					},
				]}
				layout={{
					xaxis: {
						title: {
							text: "x",
						},
					},
					yaxis: {
						title: {
							text: "f(x)",
						},
						scaleanchor: "x",
						scaleratio: 1,
					},
				}}
			/>
		</div>
	);
};

export default Index;

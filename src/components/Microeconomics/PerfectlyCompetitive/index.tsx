import React, { useState } from "react";
import { create, all } from "mathjs";
import type { Matrix } from "mathjs";

import Plot from "../../Plot";

const MathJS = create(all, {});

type GenNumArr = number[] | Matrix | number[][];

interface Bounds {
	mktQ: [number, number, number?];
	firmQ: [number, number, number?];
}

interface MarketEquations {
	S: string;
	D: string;
}

interface FirmEquations {}

interface AllEquations {
	mkt: MarketEquations;
	firm: FirmEquations;
}

interface CoordinateGraph {
	name: string;
	yVals: GenNumArr;
}

interface AllCoordinateGraphs {
	mkt: (CoordinateGraph | null)[];
	firm: CoordinateGraph[];
}

const eqToGraph = (eqs: MarketEquations | FirmEquations, xVals: GenNumArr): (CoordinateGraph | null)[] => {
	return Object.entries(eqs).map(([eqName, eq]) => {
		try {
			if (!MathJS.compile) throw new Error("compile not found on MathJS");
			else {
				let eq_compiled = MathJS.compile(eq);
				let yVals = xVals.map((x: number) => eq_compiled.evaluate({ x }));
				return {
					name: eqName,
					yVals,
				};
			}
		} catch (e) {
			console.log(e);
			return null;
		}
	});
};

const Perfekt = (props: any) => {
	const [xStart, setXStart] = useState(-5);
	const [xEnd, setXEnd] = useState(5);
	const [xDelta, setXDelta] = useState(1);

	const [eq, setEq] = useState("sin(x)");

	const [bounds, setBounds] = useState<Bounds>({
		mktQ: [0, 1000],
		firmQ: [0, 100],
	});

	const [eqs, setEqs] = useState<AllEquations>({
		mkt: {
			S: "x+100",
			D: "-x+1100",
		},
		firm: {},
	});

	/*
	//these were in try-catch block
		xVals = MathJS.range(xStart, xEnd, xDelta, true).toArray();
		const expr = MathJS.compile(eq);
		yVals = xVals.map(x => expr.evaluate({ x: x }));
	*/

	let graphs: AllCoordinateGraphs = { mkt: [], firm: [] };

	if (!MathJS.range) return <div>Why</div>;
	let xVals: GenNumArr = MathJS.range(bounds.mktQ[0], bounds.mktQ[1], 1, true).toArray();

	graphs.mkt = eqToGraph(eqs.mkt, xVals);

	return (
		<div>
			<form>
				<p>
					<label>
						Supply:
						<input type="text" value={eqs.mkt.S} onChange={e => setEqs({ ...eqs, mkt: { ...eqs.mkt, S: e.target.value } })} />
					</label>
				</p>
				<p>
					<label>
						Demand:
						<input type="text" value={eqs.mkt.D} onChange={e => setEqs({ ...eqs, mkt: { ...eqs.mkt, D: e.target.value } })} />
					</label>
				</p>
				<p>
					<label>
						Market Quantity bounds:
						<input
							type="number"
							value={bounds.mktQ[0]}
							onChange={e => setBounds({ ...bounds, mktQ: [parseInt(e.target.value), bounds.mktQ[1]] })}
						/>
						<input
							type="number"
							value={bounds.mktQ[1]}
							onChange={e => setBounds({ ...bounds, mktQ: [bounds.mktQ[0], parseInt(e.target.value)] })}
						/>
					</label>
				</p>
			</form>
			<Plot
				data={[
					...graphs.mkt.map(graph => {
						if (!graph) return null;
						else {
							return {
								x: xVals,
								y: graph.yVals,
								type: "scatter",
								mode: "lines",
								name: graph.name,
							};
						}
					}),
				]}
				layout={{
					xaxis: {
						title: {
							text: "Q",
						},
					},
					yaxis: {
						title: {
							text: "P",
						},
						scaleanchor: "x",
						scaleratio: 1,
					},
				}}
			/>
		</div>
	);
};

export default Perfekt;

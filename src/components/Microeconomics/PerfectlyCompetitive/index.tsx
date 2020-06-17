import React, { useState } from "react";
import { compile, range } from "mathjs";
import type { Matrix, EvalFunction } from "mathjs";

import Plot from "../../Plot";
import type { Perfekt } from "./Perfekt";

const pricesToGraph = (name: string, yVals: Perfekt.GenNumArr): Perfekt.CoordinateGraph => ({ name, yVals });

const eqCompiledToGraph = (name: string, eq_compiled: EvalFunction, xVals: Perfekt.GenNumArr): Perfekt.CoordinateGraph => {
	return pricesToGraph(
		name,
		xVals.map((x: number) => eq_compiled.evaluate({ x }))
	);
};

const discreteIntegralFromZero = (vals: Perfekt.GenNumArr, isAvg: boolean = false): Perfekt.GenNumArr => {
	let cumulativeSum = 0;
	return vals.map((x: number, index: number) => {
		cumulativeSum += x;
		return isAvg ? (index === 0 ? null : cumulativeSum / index) : cumulativeSum;
	});
};

const harmonicSequence = (initialVal: number, length: number): (number | null)[] => {
	let dummyArr = new Array(length).fill(0);
	return dummyArr.map((dummy: number, index: number) => (index === 0 ? null : initialVal / index));
};

const smashArrays = (array1: any[], array2: any[], operation: (value1: any, value2: any) => any): any[] => {
	return array1.map((val: any, index: number) => (!val && !array2[index] ? null : operation(val, array2[index])));
};

const graphToData = (graph: Perfekt.CoordinateGraph, xVals: Perfekt.GenNumArr): Perfekt.Data => ({
	x: xVals,
	y: graph.yVals,
	type: "scatter",
	mode: "lines",
	name: graph.name,
});

const PerfektViz = (props: any) => {
	const [bounds, setBounds] = useState<Perfekt.Bounds>({
		mktQ: [0, 1000],
		firmQ: [0, 100],
	});

	const [eqs, setEqs] = useState<Perfekt.AllEquations>({
		mkt: {
			S: "0.1x+10",
			D: "-0.1x+110",
		},
		firm: {
			//MC: "1.667x - 76.667 + 1600/(x+10)",
			MC: "8.4*(4.4(0.134x+4.7)^2-12(0.134x+4.7)+50)/(3.2(0.134x+4.7)-13.14)-125",
		},
	});

	/*
	//these were in try-catch block
		xVals = range(xStart, xEnd, xDelta, true).toArray();
		const expr = compile(eq);
		yVals = xVals.map(x => expr.evaluate({ x: x }));
	*/

	let graphs: Perfekt.AllCoordinateGraphs = { mkt: {}, firm: {} };
	let xVals: Perfekt.GenNumArr = range(bounds.mktQ[0], bounds.mktQ[1], 1, true).toArray();
	let xValsFirm: Perfekt.GenNumArr = range(bounds.firmQ[0], bounds.firmQ[1], 1, true).toArray();
	let data: Perfekt.AllData = { mkt: [], firm: [] };

	try {
		const eq_compiled = compile(eqs.mkt.S);
		graphs.mkt.S = eqCompiledToGraph("S", eq_compiled, xVals);
	} catch (e) {
		console.error(e);
	}
	try {
		const eq_compiled = compile(eqs.mkt.D);
		graphs.mkt.D = eqCompiledToGraph("D", eq_compiled, xVals);
	} catch (e) {
		console.error(e);
	}
	data.mkt = Object.entries(graphs.mkt).map(([name, graph]) => (graph ? graphToData(graph, xVals) : null));

	try {
		const mc_compiled = compile(eqs.firm.MC);
		graphs.firm.MC = eqCompiledToGraph("MC", mc_compiled, xValsFirm);
		//graphs.firm.TC = pricesToGraph("TC", discreteIntegralFromZero(graphs.firm.MC.yVals));
		graphs.firm.ATC = pricesToGraph("ATC", discreteIntegralFromZero(graphs.firm.MC.yVals, true));
		graphs.firm.AFC = pricesToGraph("AFC", harmonicSequence(graphs.firm.MC.yVals[0], graphs.firm.MC.yVals.length));
		graphs.firm.AVC = pricesToGraph(
			"AVC",
			smashArrays(graphs.firm.ATC.yVals, graphs.firm.AFC.yVals, (total, fixed) => total - fixed)
		);
	} catch (e) {
		console.error(e);
	}
	data.firm = Object.entries(graphs.firm).map(([name, graph]) => (graph ? graphToData(graph, xVals) : null));

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
						Market Quantity upper bound:
						<input
							type="number"
							value={bounds.mktQ[1]}
							onChange={e => setBounds({ ...bounds, mktQ: [bounds.mktQ[0], parseInt(e.target.value)] })}
						/>
					</label>
				</p>
			</form>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Plot
					data={data.mkt}
					layout={{
						xaxis: {
							title: {
								text: "Q",
							},
							range: [0, 1000],
						},
						yaxis: {
							title: {
								text: "P",
							},
							scaleanchor: "x",
							scaleratio: 10,
							range: [0, 120],
						},
					}}
					style={{
						width: "100%",
					}}
				/>
				<Plot
					data={data.firm}
					layout={{
						xaxis: {
							title: {
								text: "Q",
							},
							range: [0, 100],
						},
						yaxis: {
							title: {
								text: "P",
							},
							scaleanchor: "x",
							scaleratio: 1,
							range: [0, 120],
						},
					}}
					style={{
						width: "100%",
					}}
				/>
			</div>
		</div>
	);
};

export default PerfektViz;

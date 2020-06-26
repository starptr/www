import React, { useState } from "react";
import { compile, range } from "mathjs";
import type { Matrix, EvalFunction } from "mathjs";

import P from "./P";
import Plot from "../../Plot";
import type { Perfekt } from "./Perfekt";
import TeX from "../../Katex/TeX";
import { rhythm } from "../../../utils/typography";

const pricesToGraph = (name: string, yVals: Perfekt.GenNumArr): Perfekt.CoordinateGraph => ({ name, yVals });

const eqCompiledToGraph = (name: string, eq_compiled: EvalFunction, xVals: Perfekt.GenNumArr, c?: number): Perfekt.CoordinateGraph => {
	return pricesToGraph(
		name,
		xVals.map((x: Perfekt.GenNum) => eq_compiled.evaluate({ q: x, c }))
	);
};

const discreteIntegralFromZero = (vals: Perfekt.GenNumArr, isAvg: boolean = false): Perfekt.GenNumArr => {
	let cumulativeSum = 0;
	return vals.map((x: Perfekt.GenNum, index: number) => {
		cumulativeSum += x || 0;
		return isAvg ? (index === 0 ? null : cumulativeSum / index) : cumulativeSum;
	});
};

const harmonicSequence = (initialVal: number, length: number): (number | null)[] => {
	let dummyArr = new Array(length).fill(0);
	return dummyArr.map((dummy: number, index: number) => (index === 0 ? null : initialVal / index));
};

const constToArr = (val: Perfekt.GenNum, size: number): Perfekt.GenNumArr | null =>
	val ? (new Array(size).fill(val) as Perfekt.GenNumArr) : null;

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

const getPMkt = (S?: Perfekt.CoordinateGraph | null, D?: Perfekt.CoordinateGraph | null): Perfekt.GenNum => {
	if (!S || !D) return null;

	let eqIndex: Perfekt.GenNum = null;
	let minPosDif = Number.MAX_SAFE_INTEGER;
	D.yVals.forEach((y: Perfekt.GenNum, index: number) => {
		if (!S.yVals[index] || !y) return;

		let dif = y - (S.yVals[index] as number);
		if (dif < 0) {
			return;
		} else if (dif === 0) {
			eqIndex = index;
			minPosDif = 0;
		} else {
			if (dif <= minPosDif) {
				eqIndex = index;
				minPosDif = dif;
			}
		}
	});
	return eqIndex ? D.yVals[eqIndex] : null;
};

const getPeq = (MC?: Perfekt.CoordinateGraph | null, ATC?: Perfekt.CoordinateGraph | null): Perfekt.GenNum => {
	if (!MC || !ATC) return null;

	let eqIndex: Perfekt.GenNum = null;
	let minPosDif = Number.MAX_SAFE_INTEGER;
	MC.yVals.forEach((y: Perfekt.GenNum, index: number, MCyVals) => {
		if (!ATC.yVals[index] || !y) return;

		let dif = y - (ATC.yVals[index] as number);
		if (dif < 0) {
			return;
		} else if (dif === 0) {
			if ((eqIndex && y >= (MCyVals[eqIndex] as number)) || !eqIndex) {
				eqIndex = index;
				minPosDif = 0;
			}
		} else {
			if (dif <= minPosDif) {
				eqIndex = index;
				minPosDif = dif;
			}
		}
	});
	return eqIndex ? MC.yVals[eqIndex] : null;
};

const getMinAVC = (AVC?: Perfekt.CoordinateGraph | null): Perfekt.GenNum => {
	if (!AVC) return null;
	let AVCyValsNoNull = AVC.yVals.filter((y: Perfekt.GenNum) => y != null) as number[];
	return Math.min(...AVCyValsNoNull);
};

const rawComputation = (
	bounds: Perfekt.Bounds,
	eqs: Perfekt.AllEquations,
	constants: Perfekt.Constants
): { data: Perfekt.AllData; p_mkt: Perfekt.GenNum; p_eq: Perfekt.GenNum; p_min: Perfekt.GenNum } => {
	let graphs: Perfekt.AllCoordinateGraphs = { mkt: {}, firm: {} };
	let xVals: Perfekt.GenNumArr = range(bounds.mktQ[0], bounds.mktQ[1], 1, true).toArray() as Perfekt.GenNumArr;
	let xValsFirm: Perfekt.GenNumArr = range(bounds.firmQ[0], bounds.firmQ[1], 1, true).toArray() as Perfekt.GenNumArr;
	let data: Perfekt.AllData = { mkt: [], firm: [] };

	try {
		const eq_compiled = compile(eqs.mkt.S);
		graphs.mkt.S = eqCompiledToGraph("S", eq_compiled, xVals, constants.S);
	} catch (e) {
		console.error(e);
	}
	try {
		const eq_compiled = compile(eqs.mkt.D);
		graphs.mkt.D = eqCompiledToGraph("D", eq_compiled, xVals, constants.D);
	} catch (e) {
		console.error(e);
	}
	let p_mkt = getPMkt(graphs.mkt.S, graphs.mkt.D);
	let p_mkt_yVals = constToArr(p_mkt, bounds.mktQ[1] - bounds.mktQ[0] + 1);
	graphs.mkt.Pmkt = pricesToGraph("Pmkt", p_mkt_yVals as Perfekt.GenNumArr);

	data.mkt = Object.entries(graphs.mkt).map(([name, graph]) => (graph ? graphToData(graph, xVals) : null));

	try {
		const mc_compiled = compile(eqs.firm.MC);
		graphs.firm.MC = eqCompiledToGraph("MC", mc_compiled, xValsFirm, constants.MC);
		//graphs.firm.TC = pricesToGraph("TC", discreteIntegralFromZero(graphs.firm.MC.yVals));
		graphs.firm.ATC = pricesToGraph("ATC", discreteIntegralFromZero(graphs.firm.MC.yVals, true));
		graphs.firm.AFC = pricesToGraph("AFC", harmonicSequence(graphs.firm.MC.yVals[0] as number, graphs.firm.MC.yVals.length));
		graphs.firm.AVC = pricesToGraph(
			"AVC",
			smashArrays(graphs.firm.ATC.yVals, graphs.firm.AFC.yVals, (total, fixed) => total - fixed)
		);
	} catch (e) {
		console.error(e);
	}
	graphs.firm.PeqMRARD = pricesToGraph("Pmkt", p_mkt_yVals as Perfekt.GenNumArr);
	data.firm = Object.entries(graphs.firm).map(([name, graph]) => (graph ? graphToData(graph, xVals) : null));

	return { data, p_mkt, p_eq: getPeq(graphs.firm.MC, graphs.firm.ATC), p_min: getMinAVC(graphs.firm.AVC) };
};

const PerfektViz = (props: any) => {
	const [bounds, setBounds] = useState<Perfekt.Bounds>({
		mktQ: [0, 1000],
		firmQ: [0, 100],
		P: [0, 120],
	});

	const [constants, setConstants] = useState<Perfekt.Constants>({
		S: 10,
		D: 110,
		MC: 0,
	});

	const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false);

	const [eqs, setEqs] = useState<Perfekt.AllEquations>({
		mkt: {
			S: "0.1q+c",
			D: "-0.1q+c",
		},
		firm: {
			//MC: "1.667x - 76.667 + 1600/(x+10)",
			MC: "8.4*(4.4(0.134q+4.7)^2-12(0.134q+4.7)+50)/(3.2(0.134q+4.7)-13.14)-125+c",
		},
	});

	/*
	//these were in try-catch block
		xVals = range(xStart, xEnd, xDelta, true).toArray();
		const expr = compile(eq);
		yVals = xVals.map(x => expr.evaluate({ x: x }));
	*/

	let { data, p_mkt, p_eq, p_min } = rawComputation(bounds, eqs, constants);

	let economicState = "";
	if (p_eq && p_mkt) {
		if (Math.abs(p_mkt - p_eq) <= 1) economicState = "Approximately Normal Profit";
		else if (p_eq < p_mkt) economicState = "Economic Loss";
		else economicState = "Economic Profit";
	}

	const handleChangeConstant = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
		setConstants({ ...constants, [field]: parseInt(e.target.value) });

	return (
		<div>
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
							range: [bounds.mktQ[0], bounds.mktQ[1]],
						},
						yaxis: {
							title: {
								text: "P",
							},
							scaleanchor: "x",
							scaleratio: 10,
							range: [bounds.P[0], bounds.P[1]],
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
							range: [bounds.firmQ[0], bounds.firmQ[1]],
						},
						yaxis: {
							title: {
								text: "P",
							},
							scaleanchor: "x",
							scaleratio: 1,
							range: [bounds.P[0], bounds.P[1]],
						},
					}}
					style={{
						width: "100%",
					}}
				/>
			</div>
			<form style={{ marginBottom: 0 }}>
				<P>
					Mode
					<div
						style={{
							display: "flex",
							flexDirection: "row",
						}}
					>
						<label style={{ flex: 1 }}>
							<input type="radio" checked={!isAdvancedMode} onChange={e => setIsAdvancedMode(!isAdvancedMode)} /> Friendly
						</label>
						<label style={{ flex: 1 }}>
							<input type="radio" checked={isAdvancedMode} onChange={e => setIsAdvancedMode(!isAdvancedMode)} /> Advanced
						</label>
					</div>
				</P>
				{isAdvancedMode ? (
					<>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
							}}
						>
							<P style={{ flex: 1 }}>
								<label>
									<TeX>S(q)=</TeX>{" "}
									<input
										type="text"
										value={eqs.mkt.S}
										onChange={e => setEqs({ ...eqs, mkt: { ...eqs.mkt, S: e.target.value } })}
									/>
								</label>
							</P>
							<P style={{ flex: 1 }}>
								<label>
									<TeX>D(q)=</TeX>{" "}
									<input
										type="text"
										value={eqs.mkt.D}
										onChange={e => setEqs({ ...eqs, mkt: { ...eqs.mkt, D: e.target.value } })}
									/>
								</label>
							</P>
						</div>
						<P>
							<label style={{ display: "flex", flexDirection: "row" }}>
								<TeX>MC(q)=</TeX>
								<textarea
									value={eqs.firm.MC}
									style={{
										width: "100%",
										whiteSpace: "nowrap",
										overflowY: "hidden",
									}}
									onChange={e => setEqs({ ...eqs, firm: { ...eqs.firm, MC: e.target.value } })}
								/>
							</label>
						</P>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
							}}
						>
							<P style={{ flex: 1 }}>
								<label>
									<TeX>{"Q_{mkt} = [0,"}</TeX>{" "}
									<input
										type="number"
										value={bounds.mktQ[1]}
										onChange={e => setBounds({ ...bounds, mktQ: [bounds.mktQ[0], parseInt(e.target.value)] })}
										style={{ width: rhythm(3) }}
									/>
									<TeX>]</TeX>
								</label>
							</P>
							<P style={{ flex: 1 }}>
								<label>
									<TeX>{"Q_{firm} = [0,"}</TeX>{" "}
									<input
										type="number"
										value={bounds.firmQ[1]}
										onChange={e => setBounds({ ...bounds, firmQ: [bounds.firmQ[0], parseInt(e.target.value)] })}
										style={{ width: rhythm(3) }}
									/>
									<TeX>]</TeX>
								</label>
							</P>
						</div>
					</>
				) : (
					<>
						<P>
							<label>
								<TeX>{"C_S="}</TeX> <input type="number" value={constants.S} onChange={handleChangeConstant("S")} />
								<input
									type="range"
									min="-100"
									max="120"
									value={constants.S}
									onChange={handleChangeConstant("S")}
									step="1"
								/>
							</label>
						</P>
						<P>
							<label>
								<TeX>{"C_D="}</TeX> <input type="number" value={constants.D} onChange={handleChangeConstant("D")} />
								<input type="range" min="0" max="220" value={constants.D} onChange={handleChangeConstant("D")} step="1" />
							</label>
						</P>
						<P>
							<label>
								<TeX>{"C_{MC}="}</TeX> <input type="number" value={constants.MC} onChange={handleChangeConstant("MC")} />
								<input
									type="range"
									min="-100"
									max="100"
									value={constants.MC}
									onChange={handleChangeConstant("MC")}
									step="1"
								/>
							</label>
						</P>
					</>
				)}
			</form>
			<div>
				<P>
					<TeX>{"p_{mkt} =" + p_mkt?.toString()}</TeX>
				</P>
				<P>
					<TeX>{"p_{eq} =" + p_eq?.toString()}</TeX>
				</P>
				<P>
					<TeX>{"p_{min} =" + p_min?.toString()}</TeX>
				</P>
				<P>
					Profit per unit: <TeX>{"p_{eq} - p_{mkt} = " + ((p_eq as number) - (p_mkt as number)).toString()}</TeX>
				</P>
				<P>
					Economic state? <strong>{economicState}</strong>
				</P>
				<P>
					Should the firm shutdown in the short run? <strong>{(p_mkt as number) < (p_min as number) ? "Yes" : "No"}.</strong>
				</P>
			</div>
		</div>
	);
};

export default PerfektViz;

import type { Matrix } from "mathjs";
import Perfekt from ".";

export module Perfekt {
	type GenNumArr = (number | null)[] | Matrix | number[][];

	interface Bounds {
		mktQ: [number, number, number?];
		firmQ: [number, number, number?];
		P: [number, number, number?];
	}

	interface MarketEquations {
		S: string;
		D: string;
	}

	interface FirmEquations {
		MC: string;
	}

	interface AllEquations {
		mkt: MarketEquations;
		firm: FirmEquations;
	}

	interface CoordinateGraph {
		name: string;
		yVals: GenNumArr;
	}

	interface AllCoordinateGraphs {
		mkt: {
			S?: CoordinateGraph | null;
			D?: CoordinateGraph | null;
		};
		firm: {
			MC?: CoordinateGraph | null;
			TC?: CoordinateGraph | null;
			TVC?: CoordinateGraph | null;
			TFC?: CoordinateGraph | null;
			ATC?: CoordinateGraph | null;
			AVC?: CoordinateGraph | null;
			AFC?: CoordinateGraph | null;
		};
	}

	interface Data {
		x: GenNumArr;
		y: GenNumArr;
		type: "scatter";
		mode: "lines";
		name: string;
	}

	interface AllData {
		mkt: (Data | null)[];
		firm: (Data | null)[];
	}
}

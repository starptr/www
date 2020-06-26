import type { Matrix } from "mathjs";
import Perfekt from ".";

export module Perfekt {
	type GenNum = number | null;
	type GenNumArr = GenNum[];

	interface Bounds {
		mktQ: [number, number, number?];
		firmQ: [number, number, number?];
		P: [number, number, number?];
	}

	interface Constants {
		S: number;
		D: number;
		MC: number;
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
			Pmkt?: CoordinateGraph | null;
		};
		firm: {
			MC?: CoordinateGraph | null;
			TC?: CoordinateGraph | null;
			TVC?: CoordinateGraph | null;
			TFC?: CoordinateGraph | null;
			ATC?: CoordinateGraph | null;
			AVC?: CoordinateGraph | null;
			AFC?: CoordinateGraph | null;
			PeqMRARD?: CoordinateGraph | null;
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

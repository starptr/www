export type NpData = {
	title: {
		value: string;
		url: string;
	};
	artist: {
		value: string;
		url: string;
	}[];
	album: {
		value: string;
		url: string;
	};
	cover: string;
	time: {
		//measured in ms
		progress: number;
		duration: number;
	};
	is_playing: boolean;
} | null;

export type PlayState = "not-playing" | "playing" | "token-error" | "timeout" | "loading";

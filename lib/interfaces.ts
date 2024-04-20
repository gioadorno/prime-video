export interface Details {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	media_type: string;
	original_language: string;
	original_title?: string;
	original_name?: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title?: string;
	name?: string;
	video?: boolean;
	vote_average: number;
	vote_count: number;
	runtime?: number;
	revenue?: number;
	genres?: Genres[];
	homepage?: string;
}

interface Genres {
	id: number
	name: string
}

export interface Video {
	id: string;
	iso_639_1: string;
	iso_3166_1: string;
	key: string;
	name: string;
	official: boolean;
	published_at: string;
	site: string;
	size: number;
	type: string;
}

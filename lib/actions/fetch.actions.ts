import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { ReadonlyURLSearchParams } from "next/navigation";

type queryParams = {
	id: number;
	mediaType: string;
};
type seachQuery = {
	keywords: string;
	page: number;
};
type GenreIdParam = {
	movieId?: string;
	tvId?: string;
};
type RouteParams = {
	id: number;
	type: string;
	router: AppRouterInstance;
	searchParams: ReadonlyURLSearchParams;
	path?: string;
}
type keywords = string;
type id = number;

const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
	},
};

export async function searchDatabase(search: seachQuery) {
	try {
		const request = await fetch(
			`https://api.themoviedb.org/3/search/multi?query=${search.keywords}&include_adult=false&language=en-US&page=${search.page}`,
			options
		).then((res) => res.json());

		return request;
	} catch (error) {
		console.log(error, "There has been a problem searching the database");
	}
}

export async function getTrending() {
	try {
		const movies = await fetch(
			`https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
			options
		).then((res) => res.json());
		const tv = await fetch(
			`https://api.themoviedb.org/3/trending/tv/day?language=en-US`,
			options
		).then((res) => res.json());
		const trending = [...movies?.results, ...tv?.results];

		return trending.slice(0, 10).sort(() => Math.random() - 0.05);
	} catch (error) {
		console.log(error, "There has been a problem fetching trending movies");
	}
}

export const getSearchDetails = async (search: queryParams) => {
	console.log(search)
	try {
		switch (search.mediaType) {
			case "movies":
				return await fetch(
					`https://api.themoviedb.org/3/movie/${search.id}?language=en-US`,
					options
				).then((res) => res.json());
			case "tv":
				return await fetch(
					`https://api.themoviedb.org/3/tv/${search.id}?language=en-US`,
					options
				).then((res) => res.json());
			default:
				return await fetch(
					`https://api.themoviedb.org/3/person/${search.id}?language=en-US`,
					options
				).then((res) => res.json());
		}
	} catch (error) {
		console.log(
			error,
			`There is a problem getting details with ${search.mediaType}`
		);
	}
};

export const getTrailer = async (id: id) => {
	try {
		return await fetch(
			`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
			options
		).then((res) => res.json());
	} catch (error) {
		console.log(error, "There was an issue getting the trailer.");
	}
};

export const getGenres = async (genreId?: GenreIdParam, page?: number) => {
	try {
		if (genreId?.movieId) {
			return await fetch(
				`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page || 1}&sort_by=popularity.desc&with_genres=${genreId.movieId}`,
				options
			).then((res) => res.json());
		} else if (genreId?.tvId) {
			return await fetch(
				`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page || 1}&sort_by=popularity.desc&with_genres=${genreId.tvId}`,
				options
			).then((res) => res.json());
		}
	} catch (error) {
		console.log(
			error,
			`"There was an issue getting movies with the genre of ${
				(genreId?.movieId && genreId?.movieId) ||
				(genreId?.tvId && genreId?.tvId)
			}."`
		);
	}
};

export const routeTo = (routeParams: RouteParams) => {
	const params = new URLSearchParams(routeParams.searchParams);
	const path = routeParams.path;
        if (routeParams.type === 'movies') {
            params.set('type', 'movies');
            routeParams.router.push(`${path ? `/${path}` : ''}/${ routeParams.id }?${ params.toString() }`);
        } else {
            params.set('type', 'tv');
            routeParams.router.push(`${path ? `/${path}` : ''}/${ routeParams.id }?${ params.toString() }`);
        };
    };

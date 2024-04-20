"use client";

import Carousel from "@/components/carousel/Carousel";
import Titles from "@/components/genre/Titles";
import { getTrending } from "@/lib/actions/fetch.actions";
import { Details } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export default function Home () {
	const [ trending, setTrending ] = useState<Details[]>([]);

	const fetchTrending = async () => {
		const results = await getTrending();
		if (results) setTrending(results);
	};

	useEffect(() => {
		if (trending.length === 0) {
			fetchTrending();
		}
	}, []);

	return (
		<>
			<section className="block w-full">
				<Carousel trending={ trending } />
			</section>
			<Titles category="Action" id={ 28 } type='movies' />
			<Titles category="Adventure" id={ 12 } type='movies' />
			<Titles category="Action & Adventure" id={ 10759 } type='tv' />
			<Titles category="Comedy" id={ 35 } type='movies' />
		</>
	);
}

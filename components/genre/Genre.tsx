"use client";

import { Details } from "@/lib/interfaces";
import Image from "next/image";
import React, { useState } from "react";
import Description from "./Description";
import { fetchVideo } from "@/lib/utils";

type Props = {
	title: Details;
	index: number;
	category: string;
	showDetails: boolean;
	setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
	currentIndex: number;
	setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
	id: number;
	type: string;
};

const Genre = ({ title, index, category, showDetails, setShowDetails, currentIndex, setCurrentIndex, id, type }: Props) => {
	const [ trailer, setTrailer ] = useState("");
	const setStates = () => {
		setCurrentIndex(index);
		setShowDetails(true);
		// fetchVideo(title.id, setTrailer);
	};
	const removeStates = () => {
		setShowDetails(false);
		setTrailer('');
	};
	return (
		<li
			onMouseEnter={ setStates }
			onMouseLeave={ removeStates }
			key={ title.id }
			id={ `${ category + title.id }` }
			className={ ` rounded-xl cursor-pointer h-full snap-start relative overflow-y-auto overflow-x-hidden no-scrollbar ` }
		>
			<article className={ `carousel-card h-[150px] md:h-[150px] w-[280px] relative ` }>
				{ trailer && currentIndex === index ? (
					<>
						<iframe
							className="absolute z-0 shadow-inner bg-cover object-cover object-right rounded-xl h-full w-full top-0 right-0"
							src={ `https://www.youtube.com/embed/${ trailer }?version=3&autoplay=1&mute=1&controls=0&vq=hd720` }
						></iframe>
						<div className="lg:video-vignette" />
					</>
				) : (
					<>
						<Image
							src={ `https://image.tmdb.org/t/p/original/${ title?.backdrop_path || title?.poster_path }` }
							alt="poster"
							fill
							className="absolute object-cover rounded-xl top-0 left-0 h-full w-full"
							loading="lazy"
						/>
					</>
				) }
				<div className="genre-vignette" />
				{ !trailer && (
					<h1 className="text-white font-mono text-lg text-[16px] w-full text-center font-semibold absolute bottom-0 left-0">
						{ title?.original_name || title?.original_title }
					</h1>
				) }
			</article>
			{ currentIndex === index && showDetails && (
				<Description title={ title } type={ type } />
			) }
		</li>
	);
};

export default Genre;

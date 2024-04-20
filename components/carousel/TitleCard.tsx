"use client";

import { routeTo } from "@/lib/actions/fetch.actions";
import { Details } from "@/lib/interfaces";
import { convertdate, debounce, fetchVideo } from "@/lib/utils";
import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

const TitleCard = ({
	item,
	index,
	currentIndex,
	trailer,
	setTrailer,
}: {
	item: Details;
	index: number;
	currentIndex: number;
	trailer: string;
	setTrailer: Dispatch<SetStateAction<string>>;
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [ showTooltip, setShowTooltip ] = useState(false);
	return (
		<li
			onMouseEnter={ debounce(() => fetchVideo(item.id, setTrailer), 1000) }
			onMouseLeave={ debounce(() => setTrailer(''), 500) }
			key={ item.id }
			id={ `${ 'trending' + item.id }` }
			className={ `list-item rounded-xl ${ index !== currentIndex && "delay-500 brightness-[.15]"
				} md:max-h-[600px] min-h-[300px]` }
		>
			<article className="carousel-card">
				{ trailer && currentIndex === index ? (
					<>
						<iframe
							className="absolute z-0 shadow-inner bg-cover object-cover object-right rounded-xl h-full w-full lg:w-[70%] top-0 right-0"
							src={ `https://www.youtube.com/embed/${ trailer }?version=3&autoplay=1&mute=1&controls=0&vq=hd720` }
						></iframe>
						<div className="lg:video-vignette" />
					</>
				) : (
					<>
						<Image
							src={ `https://image.tmdb.org/t/p/original/${ item?.backdrop_path }` }
							alt="poster"
							fill
							priority
							className="absolute object-cover rounded-xl top-0 left-0 h-full w-full"
						/>
						<div className="lg:image-vignette" />
					</>
				) }
				<div className="flex w-full h-full items-center justify-start z-[1]">
					<section className="flex flex-col items-start z-10 ml-10 w-[400px]">
						<div className="mb-7 flex flex-col items-start">
							<h1 className="text-white text-lg md:text-[27px] font-serif tracking-wide font-semibold absolute bottom-0 lg:relative">
								{ item.original_title }
							</h1>
							<p className="text-slate-200 hidden lg:block text-xs md:text-sm tracking-tight">
								Release Date: { convertdate(item.release_date) }
							</p>
							<p className="text-white text-xs hidden lg:block">
								Rating: { item.vote_average.toFixed(1) }/10
							</p>
						</div>
						<div className="flex gap-4 absolute bottom-0 right-0 lg:relative">
							<button
								onClick={ () => routeTo({
									id: item.id,
									router,
									searchParams,
									type: item.media_type === 'movie' ? 'movies' : 'tv'
								}) }
								className="bg-white hover:scale-105 hover:shadow-md hover:shadow-cyan-500/40 duration-150 ease-in rounded-md text-xs lg:text-[14px] lg:font-semibold tracking-wide px-2 lg:px-4">
								More Details
							</button>
							<div
								onMouseEnter={ () => setShowTooltip(true) }
								onMouseLeave={ () => setShowTooltip(false) }
								className="relative rounded-full bg-gray-500/60 w-9 h-9 md:h-14 md:w-14 text-white hover:bg-white hover:text-black ease-in duration-150 hover:scale-105 flex items-center justify-center"
							>
								<PlusIcon className="h-7 w-7 md:h-10 md:w-10 font-semibold" />
								{ showTooltip && (
									<div className="absolute top-0 mt-10 md:mt-16 bg-white rounded-md px-2 md:px-4 py-1 text-xs md:text-sm whitespace-nowrap min-w-max">
										Add to Watchlist
									</div>
								) }
							</div>
						</div>
						<div className="max-w-[500px] hidden lg:flex flex-wrap">
							<p className="text-white mt-10 line-clamp-3">{ item.overview }</p>
						</div>
					</section>
				</div>
			</article>
		</li>
	);
};

export default TitleCard;

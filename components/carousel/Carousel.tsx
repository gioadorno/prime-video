"use client";

import { Details } from "@/lib/interfaces";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import TitleCard from "./TitleCard";

const Carousel = ({ trending }: { trending: Details[]; }) => {
	const [ currentIndex, setCurrentIndex ] = useState(0);
	const [ showIcons, setShowIcons ] = useState(false);
	const [ trailer, setTrailer ] = useState("");
	const containerRef = useRef(null);

	const scrollTo = (id: string, index: number) => {
		setTrailer("");
		setCurrentIndex(index);
		const item = document.getElementById(`trending${ id }`);
		if (containerRef.current && item) {
			const xPosition = item.offsetLeft;
			containerRef.current.scrollLeft = xPosition;
		}
	};

	const scrollLeft = () => {
		if (currentIndex > 0) {
			setTrailer("");
			setCurrentIndex(currentIndex - 1);
			const id = trending.at(currentIndex - 1)?.id;
			const item = document.getElementById(`${ 'trending' + id }`);
			item?.scrollIntoView({ behavior: "smooth" });
			if (containerRef.current && item) {
				const xPosition = item.offsetLeft;
				containerRef.current.scrollLeft = xPosition;
			}
		}
	};

	const scrollRight = () => {
		if (currentIndex < trending.length - 1) {
			setTrailer("");
			setCurrentIndex(currentIndex + 1);
			const id = trending.at(currentIndex + 1)?.id;
			const item = document.getElementById(`trending${ id }`);
			item?.scrollIntoView({ behavior: "smooth" });
			if (containerRef.current && item) {
				const xPosition = item.offsetLeft;
				containerRef.current.scrollLeft = xPosition;
			}
		}
	};

	useEffect(() => {
		console.log(trending);
	}, [ trending ]);

	return (
		<div className="mb-9 relative">
			<div
				onMouseEnter={ () => setShowIcons(true) }
				onMouseLeave={ () => setShowIcons(false) }
				className="grid-container view-width"
			>
				{/* Previous */ }
				<button
					onClick={ scrollLeft }
					aria-label="Previous title"
					className={ `${ currentIndex === 0 && showIcons
						? "cursor-default"
						: "cursor-pointer"
						} left scroll-button text-white group pr-8` }
				>
					<ChevronLeftIcon
						className={ `${ currentIndex !== 0 && showIcons ? "block" : "hidden"
							} group-hover:scale-150 duration-150 ease-in` }
						width={ 24 }
						height={ 24 }
					></ChevronLeftIcon>
				</button>
				<ul ref={ containerRef } className="list-container no-scrollbar ">
					{ trending?.map((item, index) => (
						<TitleCard
							key={ item.id }
							item={ item }
							index={ index }
							currentIndex={ currentIndex }
							trailer={ trailer }
							setTrailer={ setTrailer }
						/>
					)) }
				</ul>
				{/* Next */ }
				<button
					onClick={ scrollRight }
					aria-label="next title"
					className={ `${ currentIndex < trending.length - 1 && showIcons
						? "cursor-pointer"
						: "cursor-default"
						} right scroll-button text-white group pl-8` }
				>
					<ChevronRightIcon
						className={ `${ currentIndex < trending.length - 1 && showIcons
							? "block"
							: "hidden"
							} group-hover:scale-150 duration-150 ease-in` }
						width={ 24 }
						height={ 24 }
					></ChevronRightIcon>
				</button>
			</div>
			<div className="mt-3">
				<ul className="flex justify-center gap-4">
					{ trending?.map((title, index) => (
						<li
							onClick={ () => scrollTo(`${ title.id }`, index) }
							className={ `${ index === currentIndex
								? "bg-white cursor-default"
								: "bg-slate-600/60 hover:scale-125 hover:bg-slate-600/90 ease-in duration-150"
								} rounded-[50%] h-2 w-2 list-none cursor-pointer` }
							key={ title?.original_title }
						></li>
					)) }
				</ul>
			</div>
		</div>
	);
};

export default Carousel;

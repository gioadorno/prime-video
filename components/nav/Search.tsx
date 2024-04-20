"use client";

import { routeTo, searchDatabase } from "@/lib/actions/fetch.actions";
import { Details } from "@/lib/interfaces";
import { debounce, handleDateFormat } from "@/lib/utils";
import {
	ArrowLeftCircleIcon,
	ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type Props = {
	searchSelected: boolean;
	setSearchSelected: Dispatch<SetStateAction<boolean>>;
};

const Search = ({ searchSelected, setSearchSelected }: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const ref: React.MutableRefObject<any> = useRef(null);
	const listContainer: React.MutableRefObject<any> = useRef(null);
	const [ searchResults, setSearchResults ] = useState<any>({});
	const [ showResults, setShowResults ] = useState(false);
	const params = new URLSearchParams(searchParams);

	const handleSearchResults = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			params.set('search', e.target.value);
		} else {
			params.delete('search');
		}
		router.replace(`${ pathname }?${ params.toString() }`);
		getSearchResults(e.target.value, 1);
	};

	const pageDown = () => {
		if (searchResults.page > 1) {
			getSearchResults(searchParams.get('search')?.toString() || '', searchResults.page - 1);
			listContainer.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}
	};

	const pageUp = () => {
		if (searchResults.page < searchResults.total_results) {
			getSearchResults(searchParams.get('search')?.toString() || '', searchResults.page + 1);
			listContainer.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}
	};

	const getSearchResults = (search: string, page: number) => {
		searchDatabase({ keywords: search, page: page }).then((res) => {
			setSearchResults(res);
			setShowResults(true);
		});
	};

	const showSearchResults = () => {
		if (searchResults?.results?.length > 0 && !showResults) {
			setShowResults(true);
		}
	};

	useEffect(() => {
		const handleOutSideClick = (event: MouseEvent) => {
			if (!ref.current?.contains(event.target)) {
				setShowResults(false);
			}
		};

		if (searchParams.get('search')?.toString()) {
			getSearchResults(searchParams.get('search')?.toString() || '', 1);
		}

		window.addEventListener("mousedown", handleOutSideClick);

		return () => {
			window.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [ ref ]);
	return (
		<div
			className={ `animate-forward flex items-center ${ searchSelected ? "animate-slideLeft" : "animate-slideRight"
				} w-full relative` }
		>
			<input
				onChange={ debounce(
					(e: ChangeEvent<HTMLInputElement>) => handleSearchResults(e),
					400
				) }
				onClick={ showSearchResults }
				type="text"
				className="peer h-full placeholder-primary-color w-full border-b border-slate-500 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-slate-300 outline outline-0 transition-all placeholder-shown:border-primary-color focus:border-primary-color focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
				placeholder=" "
				defaultValue={ searchParams.get('search')?.toString() }
			/>
			<label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-primary-color transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-primary-color after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-primary-color/70 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary-color peer-focus:after:scale-x-100  peer-disabled:peer-placeholder-shown:text-primary-color">
				Search...
			</label>
			{ showResults && searchResults?.results?.length > 0 && (
				<div
					ref={ ref }
					className="absolute top-10 left-0 w-full flex flex-col max-h-96 min-h-max md:max-h-[500px] bg-slate-600/90"
				>
					<div
						ref={ listContainer }
						className="w-full h-full flex-1 overflow-y-auto"
					>
						{ searchResults.results.map((result: Details) => (
							<div
								onClick={ () => {
									console.log(result.title);
									params.set('search', result.title || '');
									router.replace(`${ pathname }?${ params.toString() }`);
									routeTo({
										id: result.id,
										router,
										searchParams,
										type: result.media_type === 'movie' ? 'movies' : 'tv'
									});
									setShowResults(false);
								} }
								key={ result.id }
								className="flex items-center justify-between py-1 px-1 hover:bg-slate-700/40 cursor-pointer duration-150 ease-in text-slate-300 hover:text-primary-color"
							>
								<div className="flex gap-2 px-1 items-center overflow-hidden text-xs md:text-base">
									<Image
										src={ `https://image.tmdb.org/t/p/original/${ result.poster_path || result.backdrop_path }` }
										alt="poster"
										width="0"
										height="0"
										priority
										sizes="100vw"
										className="w-12 h-12"
									/>
									<span className="flex items-center gap-1">
										<p className="">{ result.title || result.name }</p>
										{ result.release_date &&
											`(${ handleDateFormat(result.release_date) })` }
									</span>
								</div>
								<p className="text-xs md:text-sm pr-2">
									{ result.media_type === "movie" ? "Movie" : "TV" }
								</p>
							</div>
						)) }
					</div>
					<div className="bg-slate-800 min-h-max flex px-2 items-center justify-between w-full py-2 relative">
						{ searchResults.total_results > 0 && (
							<p className="text-white text-[12px]">
								Total Results: { searchResults.total_results }
							</p>
						) }
						<p className="text-sm text-white font-semibold">
							Page { searchResults.page } of { searchResults.total_pages }
						</p>
						<div className="flex items-center gap-1">
							<ArrowLeftCircleIcon
								onClick={ debounce(pageDown, 100) }
								width={ 25 }
								height={ 25 }
								className={ `${ searchResults.page === 1
									? "text-black/70 cursor-default"
									: "text-white cursor-pointer hover:scale-110 duration-150 ease-in hover:text-primary-color"
									}` }
							/>
							<ArrowRightCircleIcon
								onClick={ debounce(pageUp, 100) }
								width={ 25 }
								height={ 25 }
								className={ `${ searchResults.page === searchResults.total_results
									? "text-black/70 cursor-default"
									: "text-white cursor-pointer hover:scale-110 duration-150 ease-in hover:text-primary-color"
									}` }
							/>
						</div>
					</div>
				</div>
			) }
		</div>
	);
};

export default Search;

"use client";

import React, { useEffect, useState } from "react";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import NavList from "./NavList";
import Search from "./Search";

type Props = {};

function Nav ({ }: Props) {
	const [ scrollPosition, setScrollPosition ] = useState<number>(0);
	const [ top, setTop ] = useState<boolean>(true);
	const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
	const [ searchSelected, setSearchSelected ] = useState<boolean>(false);

	const scroll = () => {
		const position = window.scrollY;
		setScrollPosition(position);
		scrollPosition === 0 ? setTop(true) : setTop(false);
	};

	useEffect(() => {
		window.addEventListener("scroll", scroll);
		return () => window.removeEventListener("scroll", scroll);
	});

	return (
		<nav
			className={ `fixed flex px-6 justify-between md:justify-center items-center ${ top ? "w-full top-0 bg-dark-1" : "w-full  md:w-72 md:rounded-lg"
				} z-50` }
		>
			<button
				onClick={ () => setMenuOpen(!menuOpen) }
				className="flex md:hidden gap-2 items-center"
			>
				<p className="text-white">Menu</p>
				{ menuOpen ? (
					<ChevronUpIcon
						className="text-white font-semibold"
						height={ 18 }
						width={ 18 }
					/>
				) : (
					<ChevronDownIcon
						className="text-white font-semibold"
						height={ 18 }
						width={ 18 }
					/>
				) }
			</button>
			<div className="hidden sm:flex md:hidden flex-1 px-14">
				{ searchSelected && <Search searchSelected={ searchSelected } setSearchSelected={ setSearchSelected } /> }
			</div>
			<div className="flex items-center gap-2">
				<MagnifyingGlassIcon
					height={ 20 }
					width={ 20 }
					onClick={ () => setSearchSelected(!searchSelected) }
					className={ `block md:hidden scale-hover ${ searchSelected ? "text-[#00a3db]" : "text-white"
						}` }
				/>
				<Link href="/" className="block">
					<Image
						src="https://static.vecteezy.com/system/resources/previews/019/040/346/original/amazon-prime-video-logo-editorial-free-vector.jpg"
						alt="logo"
						priority={ true }
						width={ 140 }
						height={ 100 }
					/>
				</Link>
			</div>
			<div className="hidden md:flex md:w-[550px] lg:w-[700px]">
				{ searchSelected ? (
					<Search searchSelected={ searchSelected } setSearchSelected={ setSearchSelected } />
				) : (
					<NavList searchSelected={ searchSelected } />
				) }
			</div>

			<MagnifyingGlassIcon
				height={ 20 }
				width={ 20 }
				onClick={ () => setSearchSelected(!searchSelected) }
				className={ `hidden md:block ml-2 scale-hover ${ searchSelected ? "text-primary-color" : "text-white"
					}` }
			/>
		</nav>
	);
}

export default Nav;

"use client";

import { getGenres, routeTo } from "@/lib/actions/fetch.actions";
import { Details } from "@/lib/interfaces";
import React, { useEffect, useRef, useState } from "react";
import Genre from "./Genre";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  movieGenreId?: string;
  category: string;
  tvGenreId?: string;
  id: number;
  type: string;
};

const Titles = ({ id, category, type }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const wrapperRef = useRef(null);
  const [showIcons, setShowIcons] = useState(false);
  const [titles, setTitles] = useState<Details[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        const wrapperElement = wrapperRef.current as HTMLDivElement;
        // Check if scrolling is in progress
        setIsScrolling(true);

        // Calculate the scroll position
        const scrollLeft = wrapperElement.scrollLeft;
        const scrollWidth = wrapperElement.scrollWidth;
        const clientWidth = wrapperElement.clientWidth;
        // Determine if we are at the beginning or end of the carousel
        const atStart = scrollLeft === 84;
        const atEnd = scrollLeft + clientWidth === scrollWidth;

        // Update the visibility of the buttons
        setShowLeftButton(!atStart);
        setShowRightButton(!atEnd);

        // Reset scrolling flag after a brief delay
        setTimeout(() => setIsScrolling(false), 100);
      }
    };

    // Add a scroll event listener to the wrapper
    if (wrapperRef.current) {
      const wrapperElement = wrapperRef.current as HTMLDivElement;
      wrapperElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      // Remove the event listener when the component unmounts
      if (wrapperRef.current) {
        const wrapperElement = wrapperRef.current as HTMLDivElement;
        wrapperElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [showIcons]);

  const scrollLeft = () => {
    if (!isScrolling && wrapperRef.current) {
      const wrapperElement = wrapperRef.current as HTMLDivElement;
      const screenWidth = window.innerWidth;
      const scrollAmount = screenWidth >= 1800 ? -1800 : -screenWidth;
      wrapperElement.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (!isScrolling && wrapperRef.current) {
      const wrapperElement = wrapperRef.current as HTMLDivElement;
      const screenWidth = window.innerWidth;
      const scrollAmount = screenWidth >= 1800 ? 1800 : screenWidth;
      wrapperElement.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const fetchGenre = async ({
    movieId,
    tvId,
  }: {
    movieId?: string;
    tvId?: string;
  }) => {
    let titles;
    if (movieId) {
      titles = await getGenres({ movieId: movieId });
    } else {
      titles = await getGenres({ tvId: tvId });
    }
    titles = titles.results.sort(() => Math.random() - 0.5);
    setTitles(titles);
  };

  useEffect(() => {
    if (titles.length === 0) {
      if (type === "movies") {
        fetchGenre({ movieId: id?.toString() });
      } else fetchGenre({ tvId: id?.toString() });
    }
  }, []);
  return (
    titles.length > 0 && (
      <section className="block w-full z-0 mb-9 ">
        <div className="flex items-center ml-[4%] justify-start pb-2 gap-3">
          <span className="text-2xl font-serif text-[#1a98ff] font-bold">
            Prime
          </span>
          <h2 className="text-white font-serif font-bold text-xl">
            {category}
          </h2>
        </div>
        <div
          onMouseEnter={() => setShowIcons(true)}
          onMouseLeave={() => setShowIcons(false)}
          className="genre-grid view-width"
        >
          {/* Previous */}
          <button
            onClick={scrollLeft}
            aria-label="Previous title"
            className={`${
              showLeftButton && showIcons ? "cursor-pointer" : "cursor-default"
            } left scroll-button text-white group pr-8 z-20`}
          >
            <ChevronLeftIcon
              className={`${
                showLeftButton && showIcons ? "block" : "hidden"
              } group-hover:scale-150 duration-150 ease-in`}
              width={24}
              height={24}
            ></ChevronLeftIcon>
          </button>
          <ul
            className={`genre-container no-scrollbar gap-4 mx-auto relative max-w-[92%]`}
            ref={wrapperRef}
          >
            {titles.length > 0 &&
              titles?.map((title, index) => (
                <Genre
                  key={title.id + category}
                  index={index}
                  title={title}
                  category={category}
                  showDetails={showDetails}
                  setShowDetails={setShowDetails}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  type={type}
                  id={id}
                />
              ))}
            <li
              onClick={() =>
                routeTo({
                  id,
                  router,
                  searchParams,
                  type,
                  path: "genre",
                })
              }
              id={`${category + titles.length}`}
              className={`list-title rounded-xl cursor-pointer bg-slate-600/60 hover:bg-slate-500/60 duration-150 ease-in group w-[350px] ml-2`}
            >
              <article className="carousel-card flex items-center justify-center flex-wrap h-[150px] md:h-[150px] max-w-[250px] md:max-w-[350px] relative">
                <p className="text-white text-xl group-hover:scale-110 duration-150 ease-in">
                  View more {category}
                </p>
              </article>
            </li>
          </ul>
          {/* Next */}
          <button
            onClick={scrollRight}
            aria-label="next title"
            className={`${
              showRightButton && showIcons ? "cursor-pointer" : "cursor-default"
            } right scroll-button text-white group pl-8`}
          >
            <ChevronRightIcon
              className={`${
                showRightButton && showIcons ? "block" : "hidden"
              } group-hover:scale-150 duration-150 ease-in z-20`}
              width={24}
              height={24}
            ></ChevronRightIcon>
          </button>
        </div>
      </section>
    )
  );
};

export default Titles;

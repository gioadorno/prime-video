'use client';

import { getGenres, routeTo } from '@/lib/actions/fetch.actions';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Details } from '@/lib/interfaces';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import { convertdate } from '@/lib/utils';
import { EllipsisVerticalIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/solid';

type Props = {};

const Genre = (props: Props) => {
    const router = useRouter();
    const { id } = useParams();
    const searchParams = useSearchParams();
    const type = searchParams.get('type') as string;
    const [ items, setItems ] = useState<Details[]>([]);
    const [ hasMore, setHasMore ] = useState<boolean>(false);
    const [ page, setPage ] = useState<number>(1);

    const fetchGenre = async ({ movieId, tvId, }: { movieId?: string; tvId?: string; }) => {
        setHasMore(true);
        let titles: any;
        setPage(prevPage => prevPage + 1);
        if (movieId) {
            titles = await getGenres({ movieId }, page);
        } else {
            titles = await getGenres({ tvId }, page);
        }
        if (titles) {
            setItems(prevItems => [ ...prevItems, ...titles.results.sort(() => Math.random() - 0.5) ]);
        } else setHasMore(false);
    };

    const getNextSet = () => {
        setTimeout(() => {
            if (type === 'movies') {
                fetchGenre({ movieId: id.toString() });
            } else fetchGenre({ tvId: id.toString() });

        }, 4000);
    };

    useEffect(() => {
        if (items.length === 0) {
            if (type === 'movies') {
                fetchGenre({ movieId: id.toString() });
            } else fetchGenre({ tvId: id.toString() });
        }
    }, []);

    return (
        <InfiniteScroll
            dataLength={ items.length }
            next={ getNextSet }
            hasMore={ hasMore }
            loader={
                <div className='bg-[#07192978] rounded-lg flex flex-col h-[500px] animate-pulse w-full items-center justify-center'>
                    <h1 className='text-white/90 text-[20px]'>Loading...</h1>
                </div>
            }
            scrollableTarget='scrollable-div'
            endMessage={ <p>No more data to load</p> }
            className='max-w-lg md:max-w-3xl xl:max-w-5xl grid grid-cols-1 gap-10 mt-6 py-8'>
            { items.map(item => (
                <div
                    key={ id.toString() + item.id }
                    className='bg-[#07192978] rounded-lg flex flex-col'
                >
                    <div className='h-[500px] w-full relative'>
                        <Image
                            src={ `https://image.tmdb.org/t/p/original/${ item?.backdrop_path }` }
                            alt="poster"
                            fill
                            className="absolute object-cover rounded-xl top-0 left-0 h-full w-full"
                        />
                        <div className="lg:image-vignette" />
                    </div>
                    <div className="flex items-center justify-center z-[1] border-t-[1px] border-white py-8">
                        <article className="flex w-full flex-col items-start z-10 px-5 ">
                            <div className="mb-7 flex flex-col items-start gap-1">
                                <h1 className="text-white text-2xl md:text-[40px] font-serif tracking-wide font-semibold bottom-0 lg:relative">
                                    { item.original_title }
                                </h1>
                                <p className="text-slate-200 block text-xs md:text-lg tracking-tight mt-1">
                                    Release Date: { convertdate(item.release_date) }
                                </p>
                                <p className="text-white text-sm block">
                                    Rating: { item.vote_average.toFixed(1) }/10
                                </p>
                            </div>
                            <div className='flex items-center w-full'>
                                <div onClick={ () => routeTo({
                                    id: item.id,
                                    router,
                                    searchParams,
                                    type
                                }) } className='relative rounded-full w-11 h-11 cursor-pointer bg-white hover:bg-white ease-in duration-150 hover:scale-105 flex items-center justify-center hovers:scale-105 group'>
                                    <PlayIcon className='text-black h-7 w-7 group-hover:text-blue' />
                                </div>
                                <p className='pl-2 text-white text-2xl'>Play</p>
                                <div className='flex-1 flex justify-end items-center gap-2'>
                                    <div className='icon-button-large'>
                                        <PlusIcon className='text-white h-5 w-5' />
                                    </div>
                                    <div className='icon-button-large'>
                                        <EllipsisVerticalIcon className='text-white h-5 w-5' />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <p className="text-white mt-10">{ item.overview }</p>
                            </div>
                        </article>
                    </div>
                </div>
            )) }
        </InfiniteScroll>
    );
};

export default Genre;
'use client';

import Titles from '@/components/genre/Titles';
import { getSearchDetails } from '@/lib/actions/fetch.actions';
import { Details } from '@/lib/interfaces';
import { convertdate } from '@/lib/utils';
import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Props = {};

const Video = (props: Props) => {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const type = searchParams.get('type') as string;
    const [ details, setDetails ] = useState<Details | null>(null);

    const fetchDetails = async () => {
        let resp;
        if (type === 'movies') {
            resp = await getSearchDetails({ id: parseInt(id.toString()), mediaType: 'movies' });
        } else {
            resp = await getSearchDetails({ id: parseInt(id.toString()), mediaType: 'tv' });
        }
        if (resp) {
            console.log(resp);
            setDetails(resp);
        }
    };

    useEffect(() => {
        if (!details) {
            fetchDetails();
        }
    }, []);
    return (
        <section className='w-full grid grid-cols-1 gap-10 py-8 justify-items-center'>
            { details && (
                <>
                    <div className='max-w-lg md:max-w-4xl xl:max-w-7xl'>
                        <div
                            className='bg-[#07192978] rounded-lg flex flex-col'
                        >
                            <div className='h-[550px] w-full relative'>
                                <Image
                                    src={ `https://image.tmdb.org/t/p/original/${ details?.backdrop_path || details?.poster_path }` }
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
                                            { details.original_title }
                                        </h1>
                                        <div className='flex w-full justify-between items-center'>
                                            <div className='flex flex-col gap-1'>
                                                <p className="text-slate-200 block text-xs md:text-lg tracking-tight mt-1">
                                                    Release Date: { convertdate(details.release_date) }
                                                </p>
                                                <p className="text-white text-sm block">
                                                    Rating: { details?.vote_average?.toFixed(1) }/10
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='flex items-center w-full'>
                                        <div className='flex flex-col'>
                                            <p className="text-slate-200 block text-sm md:text-lg tracking-tight mt-1">
                                                Runtime: { details.runtime } min
                                            </p>
                                            <a href={ details.homepage } className="text-slate-200 block text-sm md:text-lg tracking-tight hover:text-primary-color">
                                                { details.homepage }
                                            </a>
                                        </div>
                                        <div className='flex-1 flex justify-end items-center gap-2'>
                                            <div className='icon-button-large'>
                                                <PlusIcon className='text-white h-5 w-5' />
                                            </div>
                                            <div className='icon-button-large'>
                                                <EllipsisVerticalIcon className='text-white h-5 w-5' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-center w-full">
                                        <p className="text-white mt-10 w-full max-w-[95%]">{ details.overview }</p>
                                    </div>
                                </article>
                            </div>
                        </div>

                    </div>
                    { details?.genres?.map(genre => (
                        <Titles key={ genre.id } category={ genre.name } type={ type } id={ genre.id } />
                    )) }
                </>
            ) }
        </section>
    );
};

export default Video;
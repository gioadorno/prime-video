import { Details } from '@/lib/interfaces';
import { convertdate } from '@/lib/utils';
import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, PlayIcon } from '@heroicons/react/24/solid';
import React from 'react';
import Rating from '../Rating';
import { useRouter, useSearchParams } from 'next/navigation';
import { routeTo } from '@/lib/actions/fetch.actions';

type Props = {
    title: Details;
    type: string;
};

const Description = ({ title, type }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    return (
        <article className='absolute top-0 left-0 min-w-full min-h-max titles-center justify-start bg-black/80 '>
            <section className="flex flex-col titles-start max-w-full min-h-full font-sans overflow-y-auto">
                <div className='flex items-center w-full px-1 gap-2 py-2 '>
                    <CheckCircleIcon className='text-blue w-4 h-4' />
                    <p className='text-white text-sm'>Included with Prime</p>
                </div>
                <div className='flex py-1 items-center'>
                    <div onClick={ () => routeTo({
                        id: title.id,
                        router,
                        searchParams,
                        type
                    }) } className='relative rounded-full w-11 h-11 bg-white hover:bg-white ease-in duration-150 hover:scale-105 flex items-center justify-center hovers:scale-105 group'>
                        <PlayIcon className='text-black h-5 w-5 group-hover:text-blue' />
                    </div>
                    <p className='pl-2 text-white text-lg'>Play</p>
                    <div className='flex-1 flex justify-end items-center gap-2'>
                        <div className='icon-button-small'>
                            <PlusIcon className='text-white h-5 w-5' />
                        </div>
                        <div className='icon-button-small'>
                            <EllipsisVerticalIcon className='text-white h-5 w-5' />
                        </div>
                    </div>
                </div>
                <div className='flex py-1 items-center'>
                    <h2 className='text-white font-bold tracking-tight'>{ title.original_name || title.original_title }</h2>
                </div>
                <div className="flex pt-1 items-center justify-between">
                    <div className='flex items-center gap-2'>
                        <Rating />
                        <p className="text-slate-200 text-xs md:text-sm tracking-tight">
                            { convertdate(title.release_date) }
                        </p>
                    </div>
                    <div className="flex items-center justify-center bg-gray-600/75 text-white px-2 py-1 text-xs font-semibold">
                        PG-13
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <p className="text-white mt-10 line-clamp-3">{ title.overview }</p>
                </div>
            </section>
        </article>
    );
};

export default Description;
import Image from "next/image";

const Attribution = () => {

    return (
        <div className='fixed bottom-0 right-2 flex w-full min-h-fit justify-end cursor-default gap-2 p-1'>
            <Image
                src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
                alt='TMDB logo'
                height={ 100 }
                width={ 100 }
            />
            <p className="text-slate-500 text-xs">
                This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
        </div>
    );
};

export default Attribution;
import { getTrailer } from "./actions/fetch.actions";
import { Video } from "./interfaces";

export function debounce(fn: any, delay: number) {
    let timeoutId: any;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

export const handleDateFormat = (date: string) => {
    return new Date(date).toLocaleDateString('en-us', {year: 'numeric'});
}
  
export const convertdate = (date: string) => {
		return new Date(date).toLocaleDateString("en-US", { year: "numeric" });
};
  
export const fetchVideo = async (id: number, setTrailer: React.SetStateAction<any>) => {
		const videoLink = await getTrailer(id);
		const youtubeId = videoLink?.results?.filter(
			(r: Video) => r.site.toLowerCase() === "youtube" && r
		)[ 0 ]?.key;
			if (youtubeId) {
				setTrailer(youtubeId);
			}
	};
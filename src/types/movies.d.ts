export interface Genre {
	id: string;
	title: string;
}

export interface Movie {
	id: string;
	posterUrl: string;
	rating: string;
	title: string;
}

export interface MovieDetail {
	bestRating: number;
	datePublished: string;
	directors: string[];
	duration: string;
	genres: Genre[];
	id: string;
	mainActors: string[];
	ratingValue: number;
	title: string;
	worstRating: number;
	summary: string;
	posterUrl: string;
	writers: string[];
}

import { defineStore } from 'pinia';
import axios from 'axios';
import type { Movie, MovieDetail, Genre } from '../types/movies.d.ts';

const baseUrl = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com';

export const useMovieStore = defineStore('movie', {
	state: () => ({
		genres: [] as Genre[],
		loading: false as Boolean,
		genre: '' as string,
		search: '' as string,
		movies: [] as Movie[],
		totalPages: 0 as number,
		movieDetail: null as MovieDetail | null
	}),
	actions: {
		setSearch(search: string) {
			this.search = search;
		},
		setGenre(genre: string) {
			this.genre = genre;
		},
		async getMovies(page = '') {
			this.loading = true;
			try {
				const params = new URLSearchParams({
					search: this.search,
					page,
					genre: this.genre,
					limit: '10'
				});
				const url = `${baseUrl}/movies?${params.toString()}`;
				const response = await axios.get(url);
				this.movies = response.data.data;
				this.totalPages = response.data.totalPages;
			} catch (error) {
				console.error('Failed to get movies', error);
			} finally {
				this.loading = false;
			}
		},
		async getGenres() {
			try {
				const params = new URLSearchParams();
				const url = `${baseUrl}/genres/movies?${params.toString()}`;
				const response = await axios.get(url);
				this.genres = response.data.data;
			} catch (error) {
				console.error('Failed to get genres', error);
			}
		},
		async getMovieDetail(id: string) {
			this.loading = true;
			try {
				const url = `${baseUrl}/movies/${id}`;
				const response = await axios.get(url);
				this.movieDetail = response.data;
			} catch (error) {
				console.error('Failed to get movie details', error);
			} finally {
				this.loading = false;
			}
		}
	}
});

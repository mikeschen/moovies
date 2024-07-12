import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com';

export const useMovieStore = defineStore('movie', {
	state: () => ({
		genres: [] as any[],
		loading: false as Boolean,
		search: '' as string,
		movies: [] as any[],
		totalPages: 0 as number
	}),
	actions: {
		// todo maybe check for token
		async getMovies(page = '', genre = '') {
			this.loading = true;
			try {
				console.log('genre 👹', genre);
				const params = new URLSearchParams({
					search: this.search,
					page,
					genre
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
				console.log('genres!!', this.genres);
			} catch (error) {
				console.error('Failed to get genres', error);
			}
		},
		// todo state interface
		setSearch(search: string) {
			this.search = search;
		}
	}
});

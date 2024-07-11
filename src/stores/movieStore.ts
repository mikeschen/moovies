import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com';

export const useMovieStore = defineStore('movie', {
	state: () => ({
		loading: false as Boolean,
		movies: [] as any[],
		totalPages: 0 as number
	}),
	actions: {
		async getMovies(title = '', page = '') {
			this.loading = true;
			try {
				const params = new URLSearchParams({ search: title, page });
				const url = `${baseUrl}/movies?${params.toString()}`;
				const response = await axios.get(url);
				console.log('Raw Response 👐', response);
				this.movies = response.data.data;
				this.totalPages = response.data.totalPages;
				console.log('Movies in: 😄 and tot pages', this.movies, this.totalPages);
			} catch (error) {
				console.error('Failed to get movies', error);
			} finally {
				this.loading = false;
			}
		}
	}
});

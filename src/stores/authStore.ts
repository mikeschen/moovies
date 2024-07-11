import { defineStore } from 'pinia';
import axios from 'axios';

const baseUrl = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		token: null as string | null
	}),
	actions: {
		async initializeAuth() {
			try {
				const response = await axios.get(`${baseUrl}/auth/token`);
				this.token = response.data.token;
				axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
			} catch (error) {
				console.error('Failed to get auth token', error);
			}
		}
	}
});

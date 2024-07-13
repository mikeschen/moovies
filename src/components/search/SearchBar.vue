<template>
	<section class="max-w-md">
		<form @submit.prevent="handleSearch" role="search">
			<label
				for="default-search"
				class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
				>Search</label
			>
			<div class="relative flex items-center">
				<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
					<svg
						class="w-4 h-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>
				<input
					v-model="searchQuery"
					type="search"
					id="default-search"
					class="block w-full p-4 ps-10 pe-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search Movies by Title"
					aria-label="Search Movies by Title"
				/>
				<button
					type="button"
					@click="clearSearch"
					class="absolute right-[10rem] p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
					aria-label="Clear search"
				>
					<svg
						class="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</button>
				<button
					type="submit"
					class="text-white absolute right-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					aria-label="Search"
				>
					Search Movies
				</button>
			</div>
			<DropdownGenres v-if="token"></DropdownGenres>
		</form>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../stores/authStore';
import { useMovieStore } from '../../stores/movieStore';
import DropdownGenres from './DropdownGenres.vue';

const movieStore = useMovieStore();
const authStore = useAuthStore();
const { token } = storeToRefs(authStore);

const searchQuery = ref('');

const handleSearch = async () => {
	movieStore.setSearch(searchQuery.value);
	await movieStore.getMovies();
};

const clearSearch = () => {
	if (!searchQuery.value) return;

	searchQuery.value = '';
	movieStore.setSearch('');
	movieStore.getMovies();
};
</script>

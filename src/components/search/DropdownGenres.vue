<template>
	<div class="relative inline-block text-left">
		<div>
			<button
				@click="toggleDropdown"
				type="button"
				class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
			>
				{{ genreName }}
				<svg
					class="-mr-1 ml-2 h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>

		<div
			v-if="isOpen"
			class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
		>
			<div
				class="py-1"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="options-menu"
			>
				<a
					v-for="genre in allGenres"
					:key="genre.id"
					href="#"
					@click.prevent="selectGenre(genre)"
					class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
					role="menuitem"
				>
					{{ genre.title }}
				</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import type { Genre } from '../types/movies';
import { useMovieStore } from '../../stores/movieStore';

const movieStore = useMovieStore();
const { genres } = storeToRefs(movieStore);

onMounted(async () => {
	await movieStore.getGenres();
});

const genreName = ref('All');

const selectGenre = (genre: Genre) => {
	if (genre.title === 'All') {
		genreName.value = 'All';
		isOpen.value = false;
		movieStore.getMovies();
		return;
	}
	genreName.value = genre.title;
	isOpen.value = false;
	movieStore.getMovies('', genre.title);
};

const allGenres = computed(() => {
	return [{ id: 0, title: 'All' }, ...genres.value];
});

// Dropdown
const isOpen = ref(false);

const toggleDropdown = () => {
	isOpen.value = !isOpen.value;
};
</script>

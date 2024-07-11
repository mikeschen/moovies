<template>
	<main>
		<SearchBar @handle-search="handleSearch"></SearchBar>
		<MoviesTable v-if="token"></MoviesTable>
	</main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useMovieStore } from '../stores/movieStore';
import { storeToRefs } from 'pinia';

import SearchBar from '../components/search/SearchBar.vue';
import MoviesTable from '../components/table/MoviesTable.vue';

const authStore = useAuthStore();
const movieStore = useMovieStore();

onMounted(async () => {
	await authStore.initializeAuth();
});

const handleSearch = (searchQuery: string) => {
	console.log(searchQuery);
	movieStore.getMovies(searchQuery);
};

const { token } = storeToRefs(authStore);
</script>

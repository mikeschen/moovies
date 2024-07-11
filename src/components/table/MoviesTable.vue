<template>
	<div v-if="loading">Loading...</div>
	<div v-else class="rounded-t-xl overflow-hidden p-10">
		<table class="table-auto">
			<MoviesTableHeader />
			<tbody>
				<tr v-for="movie in movies" :key="movie.id">
					<MoviesTableRow :movie="movie" />
				</tr>
			</tbody>
		</table>
	</div>
	<MoviesPagination></MoviesPagination>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useMovieStore } from '../../stores/movieStore';
import MoviesTableHeader from './MoviesTableHeader.vue';
import MoviesTableRow from './MoviesTableRow.vue';
import MoviesPagination from './MoviesPagination.vue';

const movieStore = useMovieStore();

onMounted(async () => {
	await movieStore.getData();
});

const { loading, movies } = storeToRefs(movieStore);
</script>

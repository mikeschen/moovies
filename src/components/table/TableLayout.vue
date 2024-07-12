<template>
	<div v-if="loading">Loading...</div>
	<div v-else class="rounded-t-xl overflow-hidden">
		<table class="table-auto">
			<TableHeader />
			<tbody>
				<tr v-for="movie in movies" :key="movie.id">
					<TableRow :movie="movie" />
				</tr>
			</tbody>
		</table>
	</div>
	<TablePagination></TablePagination>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useMovieStore } from '../../stores/movieStore';
import TableHeader from './TableHeader.vue';
import TableRow from './TableRow.vue';
import TablePagination from './TablePagination.vue';

const movieStore = useMovieStore();
const { loading, movies } = storeToRefs(movieStore);

onMounted(async () => {
	await movieStore.getMovies();
});
</script>

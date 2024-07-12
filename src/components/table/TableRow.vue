<template>
	<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
		<img class="object-fill h-24" :src="movie.posterUrl" />
	</td>
	<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
		{{ movie.title }}
	</td>
	<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
		{{ movie.rating }}
	</td>
	<td class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
		<RouterLink :to="{ name: 'detail', params: { id: movie.id } }"> Details </RouterLink>
	</td>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps({
	movie: {
		type: Object,
		required: true,
		default: () => ({
			title: '',
			posterUrl: '',
			rating: ''
		})
	}
});
</script>

<style scoped>
.movie {
	padding: 20px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
}
</style>

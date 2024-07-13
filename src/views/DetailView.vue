<template>
	<section class="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
		<DetailLayout />
		<button
			@click="goBack"
			class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
			aria-label="Go Back"
		>
			Go Back
		</button>
	</section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '../stores/movieStore';
import DetailLayout from '../components/detail/DetailLayout.vue';

interface Props {
	id: string;
}
const props = defineProps<Props>();

const movieStore = useMovieStore();

onMounted(async () => {
	await movieStore.getMovieDetail(props.id);
});

// Router navigation
const router = useRouter();
const goBack = () => {
	router.back();
};
</script>

<template>
	<div v-if="loading">Loading...</div>
	<div v-if="movieDetail && !loading" class="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
		<h1 class="text-2xl font-bold text-gray-800 mb-4">{{ movieDetail.title }}</h1>
		<img class="object-fill h-20" :src="movieDetail.posterUrl" />
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-2">
				<p class="text-gray-600">
					<span class="font-semibold">Date Published:</span>
					{{ formatDate(movieDetail.datePublished) }}
				</p>
				<p class="text-gray-600">
					<span class="font-semibold">Duration:</span>
					{{ formatDuration(movieDetail.duration) }}
				</p>
				<p class="text-gray-600">
					<span class="font-semibold">Director:</span>
					{{ movieDetail.directors?.join(', ') }}
				</p>
				<p class="text-gray-600">
					<span class="font-semibold">Writers:</span>
					{{ movieDetail.writers?.join(', ') }}
				</p>
				<div class="text-gray-600">
					<span class="font-semibold">Main Actors:</span>
					<ul class="list-disc list-inside ml-2">
						<li v-for="actor in movieDetail.mainActors" :key="actor">{{ actor }}</li>
					</ul>
				</div>
			</div>

			<div class="space-y-2">
				<div class="text-gray-600">
					<span class="font-semibold">Genres:</span>
					<span
						class="ml-2 inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
					>
						{{ movieDetail.genres.map((g) => g.title).join(', ') }}
					</span>
				</div>
				<div class="text-gray-600">
					<span class="font-semibold">Rating:</span>
					<span class="ml-2 text-lg font-bold text-yellow-500">
						{{ movieDetail.ratingValue.toFixed(1) }} / {{ movieDetail.bestRating }}
					</span>
				</div>
				<p class="text-gray-600">
					<span class="font-semibold">Summary:</span>
					{{ movieDetail.summary }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useMovieStore } from '../../stores/movieStore';
import { storeToRefs } from 'pinia';
const movieStore = useMovieStore();
const { movieDetail, loading } = storeToRefs(movieStore);

const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};

const formatDuration = (duration: string): string => {
	const match = duration.match(/PT(\d+)M/);
	return match ? `${match[1]} minutes` : duration.replace(/PT/, '');
};
</script>

<template>
	<nav
		class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
		aria-label="Pagination Navigation"
	>
		<div class="flex flex-1 justify-between sm:hidden">
			<a
				href="#"
				class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
				@click.prevent="prevPage"
				>Previous</a
			>
			<a
				href="#"
				class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
				@click.prevent="nextPage"
				>Next</a
			>
		</div>
		<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
			<div>
				<p class="text-sm text-gray-700 p-4">
					Showing
					{{ ' ' }}
					<span class="font-medium">{{ movies.length }}</span>
					{{ ' ' }}
					results
				</p>
			</div>
			<div>
				<nav
					class="isolate inline-flex -space-x-px rounded-md shadow-sm"
					aria-label="Pagination"
				>
					<a
						href="#"
						class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
						@click.prevent="prevPage"
					>
						<span class="sr-only">Previous</span>
						<ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
					</a>
					<template v-for="page in visiblePages" :key="page">
						<a
							href="#"
							:class="pageButtonClass(page)"
							@click.prevent="goToPage(page)"
							:aria-current="page === currentPage.value ? 'page' : undefined"
							>{{ page }}</a
						>
					</template>
					<a
						href="#"
						class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0"
						@click.prevent="nextPage"
					>
						<span class="sr-only">Next</span>
						<ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
					</a>
				</nav>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import { useMovieStore } from '../../stores/movieStore';

const movieStore = useMovieStore();
const { totalPages, movies } = storeToRefs(movieStore);

const currentPage = ref<number>(1);

const goToPage = (page: number | string) => {
	if (page === '...') return;

	const pageNumber = typeof page === 'number' ? page : parseInt(page, 10);
	currentPage.value = pageNumber;
	movieStore.getMovies(pageNumber.toString());
};

const prevPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--;
		movieStore.getMovies(currentPage.value.toString());
	}
};

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
		movieStore.getMovies(currentPage.value.toString());
	}
};

const visiblePages = computed(() => {
	// If pages are less than 6, show all pages
	if (totalPages.value < 6) {
		return Array.from({ length: totalPages.value }, (_, i) => i + 1);
	}

	let start = Math.max(1, currentPage.value - Math.floor(5 / 2));
	let end = Math.min(totalPages.value, start + 5 - 1);

	// Adjusts the start if the range is less than 5 pages
	if (end - start + 1 < 5) {
		start = Math.max(1, end - 5 + 1);
	}

	const pages = [];
	if (start > 1) {
		pages.push(1);
		if (start > 2) pages.push('...');
	}

	for (let i = start; i <= end; i++) {
		pages.push(i);
	}

	if (end < totalPages.value) {
		if (end < totalPages.value - 1) pages.push('...');
		pages.push(totalPages.value);
	}

	return pages;
});

const pageButtonClass = (page: number | string) => [
	'relative px-4 py-2 inline-flex items-center focus:z-20 font-semibold text-sm',
	page === currentPage.value
		? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
		: 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:outline-offset-0',
	{ 'cursor-default': page === '...' }
];
</script>

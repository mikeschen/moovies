<template>
	<div
		class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
	>
		<div class="flex flex-1 justify-between sm:hidden">
			<a
				href="#"
				class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>Previous</a
			>
			<a
				href="#"
				class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>Next</a
			>
		</div>
		<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
			<div>
				<p class="text-sm text-gray-700">
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
						class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
					>
						<span class="sr-only">Previous</span>
						<ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
					</a>
					<!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
					<template v-if="totalPages > 6">
						<a
							href="#"
							aria-current="page"
							class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							@click.prevent="goToPage(1)"
							>1</a
						>
						<a
							href="#"
							class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
							@click.prevent="goToPage(2)"
							>2</a
						>
						<a href="#" :class="linkClass" @click.prevent="goToPage(3)">3</a>
						<span
							class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
							>...</span
						>
						<a href="#" :class="linkClass" @click.prevent="goToPage(totalPages - 2)">{{
							totalPages - 2
						}}</a>
						<a href="#" :class="linkClass" @click.prevent="goToPage(totalPages - 1)">{{
							totalPages - 1
						}}</a>
						<a href="#" :class="linkClass" @click.prevent="goToPage(totalPages)">{{
							totalPages
						}}</a>
					</template>
					<template v-else>
						<template v-for="(page, i) in totalPages" :key="i">
							<a href="#" :class="linkClass" @click.prevent="goToPage(i + 1)">{{
								i + 1
							}}</a>
						</template>
					</template>
					<a
						href="#"
						class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
					>
						<span class="sr-only">Next</span>
						<ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
					</a>
				</nav>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { storeToRefs } from 'pinia';
import { useMovieStore } from '../../stores/movieStore';

const movieStore = useMovieStore();

const currentPage = ref(1);

function goToPage(page: number) {
	isActive.value = !isActive.value;
	currentPage.value = page;
	useMovieStore().getMovies('', page);
}

const isActive = ref(false);

const linkClass = computed(() => ({
	'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
		true,
	'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600':
		isActive.value
}));

const { totalPages, movies } = storeToRefs(movieStore);
</script>

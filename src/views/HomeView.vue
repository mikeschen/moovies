<template>
	<main>
		<SearchBar></SearchBar>
		<MoviesTable v-if="token"></MoviesTable>
	</main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { storeToRefs } from 'pinia';

import SearchBar from '../components/search/SearchBar.vue';
import MoviesTable from '../components/table/MoviesTable.vue';

const authStore = useAuthStore();

onMounted(async () => {
	await authStore.initializeAuth();
});

const { token } = storeToRefs(authStore);
</script>

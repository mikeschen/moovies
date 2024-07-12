<template>
	<main>
		<SearchBar></SearchBar>
		<TableLayout v-if="token"></TableLayout>
	</main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { storeToRefs } from 'pinia';
import SearchBar from '../components/search/SearchBar.vue';
import TableLayout from '../components/table/TableLayout.vue';

const authStore = useAuthStore();
const { token } = storeToRefs(authStore);

onMounted(async () => {
	await authStore.initializeAuth();
});
</script>

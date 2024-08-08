<script setup>
import ProductListing from '@/components/ProductListing.vue';
import Searchbar from '@/components/vuetify/Searchbar.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore()
const user = computed(() => store.state.user)
</script>

<template>
    <div class=" p-9 min-h-svh">
        <h2 v-if="user" class="text-xl text-center max-sm:text-sm">Hi, {{ user?.firstname }}</h2>
        <p class="text-4xl font-normal mt-8 text-center max-sm:text-2xl">What are you looking for today?</p>
            <Searchbar />
            <ProductListing />
    </div>
</template>
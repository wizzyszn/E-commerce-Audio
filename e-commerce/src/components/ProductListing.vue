<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Star from './svgs/Star.vue';
import SixDots from './svgs/SixDots.vue';
const store = useStore();
const route = useRouter();
const products = computed(() => store.getters.filteredProducts);
const loading = computed(() => store.getters.productLoading);
onMounted( async() =>{
    await store.dispatch("getProductListings")
});
function getProduct(id){
    route.push(`/product/${id}`)
}
</script>
<template>
<div class="min-h-80 p-[5%] px-[20%] flex flex-wrap gap-7">
    <div v-if="loading" class="w-full flex justify-center items-center">
    <SixDots />
    </div>
    <div v-else-if="products.length > 1" v-for="product in products" :key="product._id" class=" flex flex-col cursor-pointer shadow-xl border"  @click="getProduct(product._id)">
        <!-- Container for the image -->
        <div class="w-36 h-36 relative overflow-hidden">
            <!-- Image element -->
            <img :src="product.imageURL" :alt="product.name" class="absolute object-cover w-full h-full">
        </div>
        <div class=" flex flex-col p-2">
        <span class="mt-2 text-xs">
            {{ product.name}}
        </span>
        <div class=" flex justify-between items-center mt-2">
        <span class="text-xs">
            {{"$"+ product.price}}
        </span>
        <div class=" flex  items-center">
            <span class="text-xs">{{ product.ratings}}</span>
            <Star class=" w-4" />
        </div>
        
        </div>
        </div>
        
    </div>
    <div v-else class=" flex w-full">
        <h2 class=" max-sm:text-sm text-xl text-center w-full">No results found. Please try different keywords or refine your search
        </h2>
        </div>
</div>

</template>
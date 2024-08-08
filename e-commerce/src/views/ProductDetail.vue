<script setup>
import { baseUrl, getRequest } from '@/utils/requests';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import SixDots from '@/components/svgs/SixDots.vue';
const route = useRoute();
const {id} = route.params;
const productData = ref(null);
const productDataLoading = ref(false);
const productId = computed(() => id);
onMounted(async () => {
    try{
        productDataLoading.value = true
        const response = await getRequest(`${baseUrl}/product/find/${productId.value}`);
        productDataLoading.value =false
        console.log(response)
        productData.value = response
    }catch(err){
        productDataLoading.value = false
        toast.error(err.message)
    }
})
</script>

<template>
   <div class=" flex justify-center h-[90%] p-[5%]">
         <div v-if="productDataLoading">
            <SixDots />
         </div>
        <div v-else-if="productData" class="grid grid-cols-2 max-sm:flex max-sm:flex-col min-h-[500px] w-[1000px]">
            <div v-if="productData.imageURL" class=" w-full relative h-full overflow-hidden">
            <img :src="productData.imageURL" :alt="productData.name" class="">
            </div>
            <div class="p-7 flex flex-col gap-3 ">
                <h1 class=" text-xl" v-if="productData.name">{{ productData.name }}</h1>
                <p class="text-sm">{{ productData.brand }}</p>
                <p><b>Vendor:</b> <span class=" text-sm">{{ productData.createdBy.lastname }}</span></p>
                <p class=" text-lg font-semibold">{{ "$" + productData.price }}</p>
                <p><b>Color:</b>  <span class=" text-sm">{{ productData.color }}</span></p>
                <p><b>Size:</b>  <span class=" text-sm">{{ productData.size }}</span></p>
                <p><b>Dimension:</b>  <span class=" text-sm">{{productData.dimensions.width + "X" + " " + productData.dimensions.height + "mm"}}</span></p>
                <p><b>Weight:</b>  <span class=" text-sm">{{productData.weight + "kg"}}</span></p>
                <p><b>Stocks:</b>  <span class=" text-sm">{{productData.stockQuantity + " units"}}</span></p>
            </div>
            <div class=" col-span-2 p-4">
                    <h2 class="text-center text-lg font-semibold m-3">Description:</h2>
                    <div v-html="productData.description" class="description" ></div>
                </div>
        </div>
        

   </div>
</template>
<style scoped>
</style>
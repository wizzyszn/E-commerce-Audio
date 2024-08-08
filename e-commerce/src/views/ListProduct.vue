<script setup>
import { VTextField, VFileInput } from 'vuetify/lib/components/index.mjs';
import { ref, watch } from 'vue';
import TipTapEditor from '@/components/TipTapEditor.vue';
const productDetails = ref({
    name: '',
    description: '<p>Describe your product</p>',
    amount: 0,
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    stock: 0,
    brand: '',
    imageURL: ''
});

const submitForm = () => {
    console.log('Product details:', productDetails.value);
    // Here you can handle form submission, e.g., send data to an API
};
</script>

<template>
    <div class="flex p-[5%] pt-10 items-center min-h-svh flex-col gap-9">
        <h1 class="text-2xl">List an item to sell</h1>
        <div class="w-full px-[30%] max-sm:px-0">
            <form @submit.prevent="submitForm" class="flex flex-col gap-2">
                <VTextField v-model="productDetails.name" label="Enter name of product" type="text" />
                <VTextField v-model="productDetails.brand" label="Enter Brand of the product" type="text" />
                <VTextField v-model="productDetails.amount" label="Amount" prefix="$" type="number" />
                <VTextField v-model="productDetails.stock" label="Stock Quantity" suffix="units" type="number" />
                <VTextField v-model="productDetails.weight" label="Weight" suffix="Kg" type="number" />
                <VTextField v-model="productDetails.length" label="Length" suffix="cm" type="number" />
                <VTextField v-model="productDetails.width" label="Width" suffix="mm" type="number" />
                <VTextField v-model="productDetails.height" label="Height" suffix="mm" type="number" />
                <VFileInput v-model="productDetails.imageURL" prepend-icon="mdi-camera" multiple clearable
                    label="Select images" />
                <h1 class="text-lg font-medium">Product description</h1>
                <TipTapEditor v-model="productDetails.description" />
                <button type="submit" class="p-2 bg-green-500 text-white mt-5 text-lg rounded-md">List</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.quill-editor {
    height: 300px;
    margin-bottom: 50px;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>
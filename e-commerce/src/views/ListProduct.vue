<script setup>
import { VTextField, VFileInput, VSelect } from 'vuetify/lib/components/index.mjs';
import { computed, ref, watch } from 'vue';
import TipTapEditor from '@/components/TipTapEditor.vue';
import { baseUrl, postRequest } from '@/utils/requests';
import { useToast } from 'vue-toastification';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';  // Import the initialized Firebase storage
import { useStore } from 'vuex';
import Bounce from '@/components/svgs/Bounce.vue';
import Success from '../assets/GIF/a14f9967-9ebd-412d-8a6c-db5661525267.gif'
 const toast = useToast();
 const store = useStore();
 const user = computed(() => store.getters.user)
const productDetails = ref({
    name: '',
    description: '<p>Describe your product</p>',
    price: 0,
    weight: 0,
    dimensions :{
   length:  0,
    width: 0,
    height: 0
    },
    stockQuantity: 0,
    brand: '',
    imageURL: '',
    createdBy : user.value._id,
    category : '',
    ratings: '',
    color : '',
    size : ''
});
const loading = ref(false);
const submissionSuccess = ref(false);
const uploadImageToFirebase = async (file) => {
  const storageReference = storageRef(storage, `images/${file.name}`);
  const snapshot = await uploadBytes(storageReference, file);
  return await getDownloadURL(snapshot.ref);
};
const submitForm = async() => {
    loading.value = true
    try{
      if(productDetails.value.imageURL) {
      const file = productDetails.value.imageURL[0];  // Assuming single file selection
      const downloadURL = await uploadImageToFirebase(file);
      productDetails.value.imageURL = downloadURL;
    }
        const response = await postRequest(`${baseUrl}/product/create`,JSON.stringify(productDetails.value));
        submissionSuccess.value = true;  
         // Show success GIF for 3 seconds, then reset form and show form again
         setTimeout(() => {
            submissionSuccess.value = false;
        }, 3000);
    }catch(err){
        toast.error(err.message)
    }finally {
    loading.value = false;  // Hide spinner
  }
};
</script>

<template>
    <div class="flex p-[5%] pt-10 items-center min-h-svh flex-col gap-9">
        <h1 class="text-2xl">List an item to sell</h1>
        <div class="w-full px-[30%] max-sm:px-0">
            <div  v-if="loading" className='fixed inset-0 bg-[#000000B3]'>
          <div className=' w-full h-full flex justify-center items-center'>
            <Bounce />
          </div>
            </div>
          <div v-if="submissionSuccess && !loading" class="flex flex-col justify-center items-center w-full ">
        <img :src="Success" alt="Success" class="w-32 h-32" />
        <p class="text-xl font-semibold" >Product listed successfully</p>
      </div>
            <form v-else @submit.prevent="submitForm" class="flex flex-col gap-2">
                <VTextField v-model="productDetails.name" label="Enter name of product" type="text" />
                <VTextField v-model="productDetails.brand" label="Enter Brand of the product" type="text" />
                <VSelect clearable v-model="productDetails.category" label="Category" :items="['Headphones', 'Ear Buds', 'Ear Plugs']" />
                <VSelect clearable v-model="productDetails.color" label="Colors" :items="['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown', 'Gray', 'Black', 'White']" />
                <VTextField v-model="productDetails.price" label="Price" prefix="$" type="number" />
                <VTextField v-model="productDetails.ratings" label="Ratings"  type="number" />
                <VTextField v-model="productDetails.stockQuantity" label="Stock Quantity" suffix="units" type="number" />
                <VTextField v-model="productDetails.weight" label="Weight" suffix="Kg" type="number" />
                <VTextField v-model="productDetails.dimensions.length" label="Length" suffix="cm" type="number" />
                <VTextField v-model="productDetails.size" label="Size"type="text" />
                <VTextField v-model="productDetails.dimensions.width" label="Width" suffix="mm" type="number" />
                <VTextField v-model="productDetails.dimensions.height" label="Height" suffix="mm" type="number" />
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
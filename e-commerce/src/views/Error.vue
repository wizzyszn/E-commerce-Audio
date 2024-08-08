<template>
    <div class=" h-[20rem] flex justify-center items-center">
        <div class=" flex flex-col gap-3 mt-56">
            <div class="flex justify-center">
                <img :src="Image404" class=" max-sm:w-[100%] w-[20%]"alt="404">
            </div>
            <h2 class=" text-center text-xl">Page not found</h2>
        </div>
       
    </div>
</template>
<script setup>
import Image404 from '../assets/images/3747371.jpg'
</script>
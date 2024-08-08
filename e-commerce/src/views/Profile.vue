<template>
    <div class=" h-svh mx-[25%] border p-8">
        <h2 class=" text-2xl font-semibold">Contact info</h2>
        <div>
            <div class="flex flex-col gap-5 border-2 h-[25rem] mt-5 rounded-lg p-5">
                <div class=" flex justify-between items-center">
                    <h3 class=" text-xl font-medium">Account</h3>
                    <div class=" p-1 border-2 border-black cursor-pointer rounded-full">
                        <Write />
                    </div>
                </div>
                <div class=" flex flex-col gap-1">
                    <h3 class=" text-lg font-medium">User ID</h3>
                    <span>{{ user._id }}</span>
                </div>
                <div class=" flex flex-col gap-1">
                    <h3 class=" text-lg font-medium">Name</h3>
                    <span>{{ user.lastname + " " + user.firstname }}</span>
                </div>
                <div class=" flex flex-col gap-1">
                    <h3 class=" text-lg font-medium">Email</h3>
                    <span>{{ user.email }}</span>
                </div>
                <span class=" cursor-pointer w-fit text-red-600 font-semibold mt-4 ">Close my account</span>
            </div>
            <div></div>
        </div>
    </div>
</template>
<script setup>
import Write from '@/components/svgs/Write.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const user = computed(() => store.getters.user) 
</script>
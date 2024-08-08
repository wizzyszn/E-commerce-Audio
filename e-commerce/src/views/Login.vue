<script setup>
import { computed, ref } from 'vue';
import bgImage from '../assets/images/image 10.png'
import {RouterLink, useRouter} from 'vue-router'
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import Bounce from '@/components/svgs/Bounce.vue';
const toast = useToast()
const route = useRouter()
const store = useStore()
const credentials = ref({
    email : '',
    password : ''
})
function handleChange(e){
    const {name,value} = e.target;
    credentials.value = {
        ...credentials.value,
        [name] : value
    }
};
const loginLoading = computed(() => store.state.login.loading)
async function handleSubmit(){
try{
    const {status} =await store.dispatch('fetchLoginData',credentials.value);
    if(status){     
        toast.success("Login successful")
        setTimeout(() =>{
            route.push('/');
        })
    }
}catch(err){
    console.log(err.message)
}
}
</script>

<template>
    <div class="h-svh border-2 flex items-center flex-col gap-4 p-[10%] rounded-sm">
        <div class=" flex flex-col gap-3 shadow-xl p-4 ">
            <form @submit.prevent="handleSubmit" class=" flex flex-col gap-3">
                <div class="flex flex-col justify-center">
                    <label for="email">Email</label>
                    <input type="email" class="border-2 p-1" @input="handleChange" name="email" v-model="credentials.email" placeholder="Enter your email.....">
                </div>
                <div class="flex flex-col  justify-center">
                    <label for="pasword">Password</label>
                    <input type="password" class="border-2 p-1" name="password" v-model="credentials.password" @input="handleChange" placeholder="Enter your password....">
                </div>
                <button type="submit" class="rounded-md border-2  bg-green-600 text-white p-2">Login</button>
            </form>
            <p class="text-sm">Dont have an account? <RouterLink class=" cursor-pointer text-green-600 font-semibold" to ='/register'>Sign up</RouterLink></p>
        </div>
        <div  v-if="loginLoading" className='fixed inset-0 bg-[#000000B3]'>
          <div className=' w-full h-full flex justify-center items-center'>
            <Bounce />
          </div>
        </div>
    </div>
</template>
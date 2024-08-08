<template>
    <div v-if="toggle" class=" fixed top-0 bottom-0 right-0 w-[40%] bg-white shadow-2xl z-50 p-4">
      <div @click="handleToggle" class=" mt-2"> <Cancel class=" size-8" /></div>
      <div class="h-full w-full mt-8 flex flex-col items-center gap-5">
        <RouterLink to="/" exact-active-class="active" >
            <div class=" flex gap-1 items-center justify-center p-1">
            <Home class="size-5" />
            <span class=" text-sm">Home</span>    
        </div>
        </RouterLink>
        <RouterLink to="/create" exact-active-class="active" >
            <div class=" flex gap-1 items-center justify-center p-1">
            <Add class="size-5"/>
            <span class=" text-sm">Add</span>    
        </div>
        </RouterLink>
        <RouterLink  to="/cart" exact-active-class="active" >
            <div class=" flex gap-1 items-center justify-center p-1">
            <Cart class="size-5" />
            <span class=" text-sm">Cart</span>    
        </div>
        </RouterLink>   
        
        <div class=" flex gap-1 items-center j  ustify-center">
            <button class=" text-sm"  @click="logOutFunc">logout</button>  
        </div>
      </div>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router'
import Home from './svgs/Home.vue';
import Cart from './svgs/Cart.vue';
import Add from './svgs/Add.vue';
import Cancel from '../components/svgs/Cancel.vue';
import { useStore } from 'vuex';
const route = useRouter();
const store = useStore();
const toggle = computed(() => store.state.toggleBar);
console.log("toggle in drawer", toggle.value)
function handleToggle(){
    store.commit('setToggleBar', !toggle.value) 
}
const logOutFunc = async () => {
        await store.dispatch('logOutUser');
        localStorage.removeItem('user')
        setTimeout(() => {
            route.push('/login')
        }, 2000);
    }
</script>
<style scoped>
.active div {
    border-bottom: 2px solid green;
}
</style>
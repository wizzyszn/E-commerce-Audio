    <script setup>
    import { RouterLink, useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { computed } from 'vue';
    import Cart from './svgs/Cart.vue';
    import Home from './svgs/Home.vue';
    import Add from './svgs/Add.vue';
    import Logo from '../assets/images/Group 1.png'
    const store = useStore();
    const route = useRouter();
    console.log(route)
    const user = computed(() => store.state.user);
    const logOutFunc = async () => {
        await store.dispatch('logOutUser');
        localStorage.removeItem('user')
        setTimeout(() => {
            route.push('/login')
        }, 2000);
    }
</script>
    <template>
        <nav class=" border-2 flex justify-between items-center p-5 shadow-lg">
            <div class=" flex gap-4 ml-20 max-sm:ml-0">
                <div class=" flex items-center gap-8">
                    <div class=" flex justify-center items-center">
                        <img :src="Logo" alt="">
                    </div>
                    <RouterLink exact-active-class="active" to="/">
                        <div class=" flex flex-col justify-center items-center text-sm">
                            <Home />
                            <span class=" max-sm:text-xs font-semibold">Home</span>
                        </div>
                    </RouterLink>
                    <RouterLink to='/create' exact-active-class="active">
                    <div class=" flex flex-col justify-center items-center">
                        <Add />
                        <span class=" text-sm font-semibold">List an item</span>
                    </div>
                    </RouterLink>
                </div>
                <RouterLink exact-active-class="active" v-if="!user" to="/login">Login</RouterLink>
            </div>
            <div class="flex gap-3 items-center">
                <RouterLink exact-active-class="active" v-if="user" to="/cart">
                    <div class=" flex flex-col justify-center items-center">
                        <Cart />
                        <span class="text-sm max-sm:text-xs font-semibold">Cart</span>
                    </div>
                </RouterLink>
                <RouterLink v-if="user" to="/profile">{{ user?.firstname }}</RouterLink>
                <button v-if="user" @click="logOutFunc">logout</button>
            </div>
        </nav>
    </template>

<style scoped>
.active div {
    border-bottom: 2px solid green;
}
</style>
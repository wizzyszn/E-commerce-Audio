    <script setup>
    import { computed, ref } from 'vue';
    import bgImage from '../assets/images/image 10.png'
    import { useToast } from "vue-toastification";
    import {RouterLink, useRouter} from 'vue-router';
    import Bounce from '@/components/svgs/Bounce.vue';
    import { useStore } from 'vuex';
    const route = useRouter()
    const store = useStore();
    const toast = useToast();
    const credentials = ref({
        email : '',
        password : '',
        firstname : '',
        lastname : ''
    });
    
    function handleChange(e){
        const {name,value} = e.target;
        credentials.value = {
            ...credentials.value,
            [name] : value
        }
    }
    const registerLoading = computed(() => store.state.register.loading)
    async function handleSubmit(){
    try{
       const {status} =await store.dispatch('fetchRegisterData', credentials.value);
       if(status){
        toast.success("Registration successful")
        setTimeout(() =>{
            route.push('/login')
        },3000)
    }
    }catch(err){
        toast.error(err.message)
    }
    }
   

    </script>

    <template>
        <div class="h-svh border-2 flex items-center flex-col gap-4 p-[10%] rounded-sm">
            <div class=" flex flex-col gap-3  shadow-xl p-4">
                <form @submit.prevent="handleSubmit" class=" flex flex-col gap-3">
                    <div class="flex flex-col justify-center">
                        <label for="email">Firstname</label>
                        <input type="text" class="border-2 p-1" @input="handleChange" name="firstname" v-model="credentials.firstname" placeholder="Enter your firstname....." >
                    </div>
                    <div class="flex flex-col  justify-center">
                        <label for="lastname">Lastname</label>
                        <input type="text" class="border-2 p-1" name="lastname" v-model="credentials.lastnamw" @input="handleChange" placeholder="Enter your lastname....." >
                    </div>
                    <div class="flex flex-col  justify-center">
                        <label for="email">Email</label>
                        <input type="text" class="border-2 p-1" name="email" v-model="credentials.email" @input="handleChange" placeholder="Enter your email.....">
                    </div>
                    <div class="flex flex-col  justify-center">
                        <label for="">Password</label>
                        <input type="password" class="border-2 p-1" name="password" v-model="credentials.password" @input="handleChange" placeholder="Enter your password....." >
                    </div>
                    <button type="submit" class="border-2 rounded-md bg-green-600 text-white p-2">Register</button>
                </form>
                <p class="text-sm">Already have an account? <RouterLink class=" cursor-pointer text-green-600 font-semibold" to ='/login'>Login</RouterLink></p>
            </div>
            <div  v-if="registerLoading" className='fixed inset-0 bg-[#000000B3]'>
          <div className=' w-full h-full flex justify-center items-center'>
            <Bounce />
          </div>
        </div>
        </div>
    </template>
    import { createStore } from 'vuex'
    import { baseUrl, getRequest, postRequest } from './utils/requests'
    import { useToast } from 'vue-toastification'
    import searchProducts from './functions/SearchAlgo'
    const toast = useToast()
    const store = createStore({
    state: {
        login: {
        data: null,
        loading: false
        },
        register: {
        data: null,
        loading: false
        },
        user: null || JSON.parse(localStorage.getItem('user')),
        productsListing: {
        data: [],
        loading: false
        }, // store the original products list
        filteredProducts: [],
        toggleBar : false
    },
    mutations: {
        setLoginData (state, payload) {
        state.login.data = payload
        },
        setLoginLoading (state, payload) {
        state.login.loading = payload
        },
        setRegisterData (state, payload) {
        state.register.data = payload
        },
        setRegisterLoading (state, payload) {
        state.register.loading = payload
        },
        setUser (state, payload) {
        state.user = payload
        },
        clearUser(state){
            state.user = null
        },
        setProductsListing (state, payload) {
        state.productsListing.data = payload
        state.filteredProducts = payload
        },
        setFilteredProducts (state, payload) {
        state.filteredProducts = payload
        },
        setProductLoading (state, payload) {
        state.productsListing.loading = payload
        },
        setToggleBar(state,payload){
            state.toggleBar = payload
        }
    },
    actions: {
        async fetchRegisterData ({ commit }, credentials) {
        commit('setRegisterLoading', true)
        try {
            const response = await postRequest(
            `${baseUrl}/user/create`,
            JSON.stringify(credentials)
            )
            console.log('response:', response)
            if (response.error) {
            toast.error(response.message)
            return
            }
            commit('setRegisterData', response)
            return {
            status: true
            }
        } catch (err) {
            toast.error(err.message)
        } finally {
            commit('setRegisterLoading', false)
        }
        },
        async fetchLoginData ({ commit }, credentials) {
        commit('setLoginLoading', true)
        try {
            const response = await postRequest(
            `${baseUrl}/user/login`,
            JSON.stringify(credentials)
            )
            console.log('response:', response)
            if (response.error) {
            toast.error(response.message)
            return
            }
            commit('setLoginData', response)
            commit('setUser', response)
            localStorage.setItem('user', JSON.stringify(response))
            return { status: true }
        } catch (err) {
            toast.error(err.message)
        } finally {
            commit('setLoginLoading', false)
        }
        },
        async logOutUser ({commit}) {
        try {
            const response = await getRequest(`${baseUrl}/user/logout`)
            if (!response) {
            throw new Error(response.message)
            }
            toast.success(response.message)
            commit('clearUser')
        } catch (err) {
            toast.error(err.message)
        }
        },
        async getProductListings ({ commit }) {
        try {
            commit('setProductLoading', true)
            const response = await getRequest(`${baseUrl}/product`)
            if (response.error) {
            commit('setProductLoading', false)
            toast.error(response.message)
            return
            }
            commit('setProductLoading', false)
            commit('setProductsListing', response)
        } catch (err) {
            toast.error(err.message)
            commit('setProductLoading', false)
        }
        },
        filterProducts ({ commit, state }, searchTerm) {
        const trimmedSearchTerm = searchTerm.toLowerCase().trim()
        if (trimmedSearchTerm.trim() === '') {
            // If search term is empty, show all products
            commit('setFilteredProducts', state.productsListing.data)
        } else {
            // Filter products based on the search term
            const filtered = searchProducts(
            state.productsListing.data,
            trimmedSearchTerm
            )
            commit('setFilteredProducts', filtered)
        }
        }
    },
    getters: {
        filteredProducts: state => state.filteredProducts,
        productLoading: state => state.productsListing.loading,
        isAuthenticated : state =>!!state.user,
        user : (state) => state.user
    }
    })
    export default store

<script setup>
import { RouterLink, RouterView,useRoute } from 'vue-router'
import Navbar from '../src/components/Navbar.vue'
import { computed } from 'vue';
import "vue-toastification/dist/index.css";
const route = useRoute();
const shouldHideNavbar = computed(() => route.meta.hideNavbar)
</script>
<template>
  <div id="app">
    <Navbar v-if="!shouldHideNavbar" />
    <router-view></router-view>
  </div>
</template>
<script setup>
import { RouterLink, RouterView,useRoute } from 'vue-router'
import Navbar from '../src/components/Navbar.vue'
import { computed } from 'vue';
import "vue-toastification/dist/index.css";
import Drawer from './components/Drawer.vue';

const route = useRoute();

const shouldHideNavbar = computed(() => route.meta.hideNavbar);

</script>
<template>
  <div id="app">
    <Navbar v-if="!shouldHideNavbar" />
    <Drawer />
    <router-view></router-view>
  </div>
</template>
<template>
  <VCardText>
    <VTextField class="mx-auto mt-7" color="surface-light" max-width="400" :loading="loading"
      append-inner-icon="mdi-magnify" density="compact" label="Search products" variant="solo" hide-details single-line
      @click:append-inner="onClick" @input="filterProducts" v-model="searchTerm"></VTextField>
  </VCardText>
</template>

<script setup>
import { ref } from 'vue';
import { VCardText, VTextField } from 'vuetify/components';
import { useStore } from 'vuex';
const store = useStore()
const loading = ref(false);
const loaded = ref(false);
const searchTerm = ref('');
const onClick = () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    loaded.value = true;
  }, 2000);
};
const filterProducts = () => {
  store.dispatch('filterProducts', searchTerm.value);
  console.log(searchTerm.value)
};

</script>

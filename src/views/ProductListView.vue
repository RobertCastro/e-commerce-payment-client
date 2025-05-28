<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Nuestros Productos</h1>
    <p>(Lista de productos)</p>
    <router-link to="/checkout" class="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
      Ir a Pagar
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductListView',
});
</script>
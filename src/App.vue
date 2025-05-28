<template>
  <div id="app" class="min-h-screen bg-gray-50 text-gray-900">

    <nav class="bg-white shadow-sm p-4 text-right">
      <router-link to="/" class="text-indigo-600 hover:text-indigo-800 mr-4">
        Productos
      </router-link>
      <router-link to="/cart" class="text-indigo-600 hover:text-indigo-800 relative">
        Carrito
        <span v-if="itemCount > 0" class="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {{ itemCount }}
        </span>
      </router-link>
    </nav>

    <router-view /> </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import type { RootState } from '@/store';

export default defineComponent({
  name: 'App',
  setup() {
      const store = useStore<RootState>();
      const itemCount = computed(() => store.getters['cart/itemCount']);
      return { itemCount };
  }
});
</script>
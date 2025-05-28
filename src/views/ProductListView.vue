<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8 text-center text-gray-900">Nuestros productos</h1>

    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      <p class="ml-4 text-gray-600">Cargando productos...</p>
    </div>

    <div v-else-if="error" class="text-center text-red-700 bg-red-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 class="text-xl font-semibold mb-2">¡Oops! Algo salió mal</h2>
      <p class="mb-4">{{ error }}</p>
      <button @click="loadProducts" class="bg-red-600 text-white py-2 px-5 rounded hover:bg-red-700 transition duration-200">
        Intentar de nuevo
      </button>
    </div>

    <div v-else-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>

    <div v-else class="text-center text-gray-500 h-64 flex justify-center items-center">
      <p class="text-xl">No hay productos disponibles en este momento.</p>
    </div>

     <div class="text-center mt-12">
        <router-link to="/checkout" class="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-200">
          Ir a Pagar
        </router-link>
     </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { RootState } from '@/store';
import ProductCard from '@/components/ProductCard.vue';

export default defineComponent({
  name: 'ProductListView',
  components: {
      ProductCard,
  },
  setup() {
    const store = useStore<RootState>();

    const products = computed(() => store.state.products.products);
    const isLoading = computed(() => store.state.products.isLoading);
    const error = computed(() => store.state.products.error);

    const loadProducts = () => {
      store.dispatch('products/fetchProducts');
    };

    onMounted(() => {
      if (!products.value || products.value.length === 0) {
          loadProducts();
      }
    });

    return {
      products,
      isLoading,
      error,
      loadProducts,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
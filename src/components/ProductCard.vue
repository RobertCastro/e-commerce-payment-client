<template>
  <div class="border rounded-lg p-4 shadow-sm bg-white hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
    <div>
      <h2 class="text-lg font-semibold mb-2 h-14 line-clamp-2">{{ product.name }}</h2>
      <p class="text-gray-600 mb-3 text-sm h-12 overflow-hidden line-clamp-3">{{ product.description }}</p>
      <div class="flex justify-between items-center mb-4">
          <span class="text-xl font-bold text-gray-900">${{ product.price.toLocaleString() }}</span>
          <span class="text-xs px-2 py-1 rounded-full"
                :class="product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
              {{ product.stock > 0 ? `${product.stock} disponibles` : 'Agotado' }}
          </span>
      </div>
    </div>
    <button
        class="w-full mt-auto bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="product.stock === 0"
        @click="addToCart">
        {{ product.stock > 0 ? 'Añadir al Carrito' : 'No disponible' }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Product } from '@/store/modules/products';
import { useStore } from 'vuex';
import type { RootState } from '@/store';

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore<RootState>();

    const addToCart = () => {
      store.dispatch('cart/addToCart', props.product.id);
      console.log('Añadido al carrito:', props.product.name);
      // TODO: Mostrar una notificación
    };

    return {
      addToCart,
    };
  },
});
</script>
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8 text-gray-900">Tu carrito de compras</h1>

    <div v-if="itemCount === 0" class="text-center bg-white p-10 rounded-lg shadow">
      <p class="text-xl text-gray-600 mb-6">Tu carrito está vacío.</p>
      <router-link to="/" class="bg-indigo-600 text-white py-3 px-6 rounded hover:bg-indigo-700 transition">
        Volver a la tienda
      </router-link>
    </div>

    <div v-else class="bg-white p-8 rounded-lg shadow">
      <div class="hidden md:flex justify-between border-b pb-4 mb-4 font-semibold text-gray-600">
         <span class="w-2/5">Producto</span>
         <span class="w-1/5 text-center">Cantidad</span>
         <span class="w-1/5 text-right">Total</span>
         <span class="w-1/5"></span> </div>

      <CartItemComponent
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
      />

      <div class="mt-10 pt-6 border-t flex justify-end">
        <div class="w-full md:w-1/3">
            <div class="flex justify-between mb-4">
                <span class="text-lg text-gray-600">Subtotal:</span>
                <span class="text-lg font-bold">${{ cartTotal.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between text-xl font-bold border-t pt-4">
                <span>Total:</span>
                <span>${{ cartTotal.toLocaleString() }}</span>
            </div>
            <router-link to="/checkout">
                <button class="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow hover:bg-green-700 transition">
                    Proceder al pago
                </button>
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import type { RootState } from '@/store';
import CartItemComponent from '@/components/CartItemComponent.vue';

export default defineComponent({
  name: 'ShoppingCartView',
  components: {
    CartItemComponent,
  },
  setup() {
    const store = useStore<RootState>();

    const cartItems = computed(() => store.getters['cart/cartItems']);
    const itemCount = computed(() => store.getters['cart/itemCount']);
    const cartTotal = computed(() => store.getters['cart/cartTotal']);

    return {
      cartItems,
      itemCount,
      cartTotal,
    };
  },
});
</script>
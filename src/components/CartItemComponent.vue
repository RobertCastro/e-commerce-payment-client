<template>
  <div class="flex items-center justify-between border-b py-4">
    <div class="flex items-center">
      <div>
        <h3 class="font-semibold">{{ item.name }}</h3>
        <p class="text-gray-600">${{ item.price.toLocaleString() }}</p>
      </div>
    </div>
    <div class="flex items-center">
      <input
        type="number"
        min="1"
        :value="item.quantity"
        @change="updateQty($event)"
        class="w-16 border rounded text-center mx-4"
      />
      <span class="font-semibold w-24 text-right">${{ (item.price * item.quantity).toLocaleString() }}</span>
      <button @click="removeItem" class="ml-4 text-red-500 hover:text-red-700">
        &times; </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { useStore } from 'vuex';
import type { CartItem } from '@/store/modules/cart';
import type { RootState } from '@/store';

export default defineComponent({
  name: 'CartItemComponent',
  props: {
    item: {
      type: Object as PropType<CartItem>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore<RootState>();

    const updateQty = (event: Event) => {
      const newQuantity = parseInt((event.target as HTMLInputElement).value, 10);
      if (!isNaN(newQuantity)) {
        store.dispatch('cart/updateQuantity', { productId: props.item.id, quantity: newQuantity });
      }
    };

    const removeItem = () => {
      store.dispatch('cart/removeFromCart', props.item.id);
    };

    return {
      updateQty,
      removeItem,
    };
  },
});
</script>
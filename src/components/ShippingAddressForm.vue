<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">Dirección de envío</h2>
    <form @submit.prevent>
      <div class="mb-4">
        <label for="address" class="block text-sm font-medium text-gray-700">Dirección</label>
        <input type="text" id="address" v-model="delivery.address" @input="update" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <div class="mb-4">
        <label for="city" class="block text-sm font-medium text-gray-700">Ciudad</label>
        <input type="text" id="city" v-model="delivery.city" @input="update" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <div class="mb-4">
        <label for="country" class="block text-sm font-medium text-gray-700">País</label>
        <input type="text" id="country" v-model="delivery.country" @input="update" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <div class="mb-4">
        <label for="postalCode" class="block text-sm font-medium text-gray-700">Código postal</label>
        <input type="text" id="postalCode" v-model="delivery.postalCode" @input="update" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import type { RootState } from '@/store';
import type { DeliveryInfo } from '@/store/modules/checkout';

export default defineComponent({
  name: 'ShippingAddressForm',
   setup() {
    const store = useStore<RootState>();
    const delivery = reactive<DeliveryInfo>({ ...store.getters['checkout/deliveryInfo'] });

    const update = () => {
      store.dispatch('checkout/updateDelivery', { ...delivery });
    };

    watch(() => store.getters['checkout/deliveryInfo'], (newVal) => {
        Object.assign(delivery, newVal);
    }, { deep: true });

    return { delivery, update };
  },
});
</script>
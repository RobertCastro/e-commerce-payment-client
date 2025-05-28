<template>
  <div class="bg-white p-6 rounded-lg shadow mb-6">
    <h2 class="text-xl font-semibold mb-4">Datos del cliente</h2>
    <form @submit.prevent>
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Nombre completo</label>
        <input type="text" id="name" v-model="customer.name" @input="update" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input type="email" id="email" v-model="customer.email" @input="update" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
      </div>
      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono (Opcional)</label>
        <input type="tel" id="phone" v-model="customer.phone" @input="update" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import type { RootState } from '@/store';
import type { CustomerInfo } from '@/store/modules/checkout';

export default defineComponent({
  name: 'CustomerInfoForm',
  setup() {
    const store = useStore<RootState>();
    const customer = reactive<CustomerInfo>({ ...store.getters['checkout/customerInfo'] });

    const update = () => {
      store.dispatch('checkout/updateCustomer', { ...customer });
    };

    watch(() => store.getters['checkout/customerInfo'], (newVal) => {
        Object.assign(customer, newVal);
    }, { deep: true });

    return { customer, update };
  },
});
</script>
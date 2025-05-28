<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8 text-gray-900">Proceso de pago</h1>

    <div v-if="itemCount === 0 && !transactionId" class="text-center bg-white p-10 rounded-lg shadow">
        <p class="text-xl text-gray-600 mb-6">Tu carrito está vacío. No puedes proceder al pago.</p>
        <router-link to="/" class="bg-indigo-600 text-white py-3 px-6 rounded hover:bg-indigo-700 transition">
            Volver a la tienda
        </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2">
        <CustomerInfoForm />
        <ShippingAddressForm />
      </div>

      <div class="bg-white p-6 rounded-lg shadow h-fit">
        <h2 class="text-xl font-semibold mb-4 border-b pb-3">Resumen del pedido</h2>
        <div class="mb-4">
            <p>Items: {{ itemCount }}</p>
            <p>Total: <span class="font-bold">${{ cartTotal.toLocaleString() }}</span></p>
        </div>
        <button
            @click="handleInitiateClick" :disabled="!canProceed || isLoading" class="w-full bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
            {{ isLoading ? 'Iniciando...' : (transactionId ? 'Ir a Procesar Pago' : 'Iniciar Transacción') }}
        </button>
         <p v-if="!canProceed && itemCount > 0" class="text-xs text-red-500 mt-2">
            Por favor, completa los campos requeridos en los formularios.
        </p>
        <p v-if="checkoutError" class="text-xs text-red-500 mt-2">
            {{ checkoutError }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { RootState } from '@/store';
import CustomerInfoForm from '@/components/CustomerInfoForm.vue';
import ShippingAddressForm from '@/components/ShippingAddressForm.vue';

export default defineComponent({
  name: 'CheckoutView',
  components: {
    CustomerInfoForm,
    ShippingAddressForm,
  },
  setup() {
    const store = useStore<RootState>();
    const router = useRouter();
    const checkoutError = ref<string | null>(null);
    const isLoading = ref<boolean>(false);

    const itemCount = computed(() => store.getters['cart/itemCount']);
    const cartTotal = computed(() => store.getters['cart/cartTotal']);
    const canProceed = computed(() => store.getters['checkout/isCheckoutDataComplete']);
    const transactionId = computed(() => store.state.checkout.transactionId);

    const handleInitiateClick = async () => {
      checkoutError.value = null;
      isLoading.value = true;

      if (transactionId.value) {
          console.log("Ya hay ID, ir a pagar:", transactionId.value);
          alert("Siguiente paso: Procesar pago (Aún no implementado)");
          isLoading.value = false;
          return;
      }

      if (canProceed.value) {
        try {
          const newTransactionId = await store.dispatch('checkout/initiateBackendCheckout');
          console.log("Transacción iniciada con ID:", newTransactionId);
          alert(`Transacción iniciada con ID: ${newTransactionId}. Siguiente paso: Procesar pago.`);

        } catch (error: any) {
          checkoutError.value = error.message || "Hubo un error al iniciar la transacción.";
          console.error("Error initiating checkout:", error);
        } finally {
           isLoading.value = false;
        }
      } else {
          isLoading.value = false;
      }
    };

    return {
      itemCount,
      cartTotal,
      canProceed,
      handleInitiateClick,
      transactionId,
      checkoutError,
      isLoading,
    };
  },
});
</script>
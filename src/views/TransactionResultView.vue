<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Resultado de la Transacción</h1>
    <p>ID de Transacción: {{ transactionId }}</p>
    <p>(Mostraremos si fue aprobada, rechazada o pendiente)</p>
    <router-link to="/" class="mt-4 inline-block bg-gray-500 text-white py-2 px-4 rounded">
      Volver a Productos
    </router-link>
  </div>
</template>

 <script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransactionResultView',
  props: {
      transactionId: {
          type: String,
          required: true,
      }
  }
});
</script>
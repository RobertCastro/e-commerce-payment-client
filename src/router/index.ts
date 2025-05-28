import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import ProductListView from '../views/ProductListView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import TransactionResultView from '../views/TransactionResultView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductListView,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutView,
    // TODO añadir guards: no ir a checkout si el carrito está vacío
  },
  {
    path: '/result/:transactionId',
    name: 'TransactionResult',
    component: TransactionResultView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import ProductListView from '../views/ProductListView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import TransactionResultView from '../views/TransactionResultView.vue';
import ShoppingCartView from '../views/ShoppingCartView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductListView,
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCartView,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutView,
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
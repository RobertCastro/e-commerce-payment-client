import { createStore } from 'vuex';
import productsModule from './modules/products';
import type { ProductsState } from './modules/products';
import cartModule from './modules/cart';
import type { CartState } from './modules/cart';

export interface RootState {
  products: ProductsState;
  cart: CartState;
}

export default createStore<RootState>({
  state: {} as RootState,
  mutations: {},
  actions: {},
  modules: {
    products: productsModule,
    cart: cartModule,
  },
});
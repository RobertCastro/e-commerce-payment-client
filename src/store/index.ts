import { createStore } from 'vuex';
import productsModule from './modules/products';
import type { ProductsState } from './modules/products';

export interface RootState {
  products: ProductsState;
}

export default createStore<RootState>({
  state: {} as RootState,
  mutations: {},
  actions: {},
  modules: {
    products: productsModule,
  },
});
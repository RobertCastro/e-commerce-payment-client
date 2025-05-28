import type { RootState } from '@/store';
import apiService from '@/services/apiService';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const productsModule: any = {
  namespaced: true,
  state: (): ProductsState => ({
    products: [],
    isLoading: false,
    error: null,
  }),
  mutations: {
    SET_LOADING(state: ProductsState, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    SET_PRODUCTS(state: ProductsState, products: Product[]) {
      state.products = products;
      state.error = null;
    },
    SET_ERROR(state: ProductsState, error: string | null) {
      state.error = error;
      state.products = [];
    },
  },
  actions: {
    async fetchProducts({ commit }: any) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      try {
        const products = await apiService.getProducts();
        commit('SET_PRODUCTS', products);
      } catch (error) {
        console.error('Error fetching products:', error);
        commit('SET_ERROR', 'No se pudieron cargar los productos.');
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },
  getters: {
    allProducts: (state: ProductsState) => state.products,
    isLoading: (state: ProductsState) => state.isLoading,
    error: (state: ProductsState) => state.error,
  },
};

export default productsModule;
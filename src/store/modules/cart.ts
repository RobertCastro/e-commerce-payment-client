import type { Product } from './products';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const saveCartToLocalStorage = (items: CartItem[]) => {
  localStorage.setItem('shoppingCart', JSON.stringify(items));
};

const loadCartFromLocalStorage = (): CartItem[] => {
  const savedCart = localStorage.getItem('shoppingCart');
  return savedCart ? JSON.parse(savedCart) : [];
};

const cartModule: any = {
  namespaced: true,
  state: (): CartState => ({
    items: loadCartFromLocalStorage(),
  }),
  mutations: {
    ADD_ITEM(state: CartState, product: Product) {
      const existingItem = state.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
      saveCartToLocalStorage(state.items);
    },
    REMOVE_ITEM(state: CartState, productId: string) {
      state.items = state.items.filter(item => item.id !== productId);
      saveCartToLocalStorage(state.items);
    },
    UPDATE_QUANTITY(state: CartState, { productId, quantity }: { productId: string, quantity: number }) {
      const item = state.items.find(item => item.id === productId);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== productId);
        } else {
          item.quantity = quantity;
        }
      }
      saveCartToLocalStorage(state.items);
    },
    CLEAR_CART(state: CartState) {
        state.items = [];
        saveCartToLocalStorage(state.items);
    }
  },
  actions: {
    addToCart({ commit, rootState }: any, productId: string) {
      const productToAdd = rootState.products.products.find((p: Product) => p.id === productId);
      if (productToAdd && productToAdd.stock > 0) {
        commit('ADD_ITEM', productToAdd);
      } else {
          console.warn("Producto no encontrado o sin stock:", productId);
      }
    },
    removeFromCart({ commit }: any, productId: string) {
      commit('REMOVE_ITEM', productId);
    },
    updateQuantity({ commit }: any, payload: { productId: string, quantity: number }) {
      commit('UPDATE_QUANTITY', payload);
    },
    clearCart({ commit }: any) {
        commit('CLEAR_CART');
    }
  },
  getters: {
    cartItems: (state: CartState): CartItem[] => state.items,
    itemCount: (state: CartState): number => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    cartTotal: (state: CartState): number => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  },
};

export default cartModule;
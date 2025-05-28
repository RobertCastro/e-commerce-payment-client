import type { RootState } from '@/store';
import apiService from '@/services/apiService';
import type { CartItem } from './cart'; 

export interface CustomerInfo {
  email: string;
  fullName: string;
  phoneNumber: string;
}

export interface DeliveryInfo {
  address: string;
  city: string;
  country: string;
}

export interface CheckoutState {
  customer: CustomerInfo;
  delivery: DeliveryInfo;
  transactionId: string | null;
}

const saveCheckoutToLocalStorage = (state: CheckoutState) => {
  localStorage.setItem('checkoutCustomer', JSON.stringify(state.customer));
  localStorage.setItem('checkoutDelivery', JSON.stringify(state.delivery));
};

const loadCheckoutFromLocalStorage = (): { customer: CustomerInfo, delivery: DeliveryInfo } => {
    const customer = localStorage.getItem('checkoutCustomer');
    const delivery = localStorage.getItem('checkoutDelivery');
    return {
        customer: customer ? JSON.parse(customer) : { email: '', fullName: '', phoneNumber: '' },
        delivery: delivery ? JSON.parse(delivery) : { address: '', city: '', country: '' },
    };
};


const checkoutModule: any = {
  namespaced: true,
  state: (): CheckoutState => {
      const { customer, delivery } = loadCheckoutFromLocalStorage();
      return {
          customer,
          delivery,
          transactionId: null,
      };
  },
  mutations: {
    UPDATE_CUSTOMER_INFO(state: CheckoutState, customerInfo: Partial<CustomerInfo>) {
      state.customer = { ...state.customer, ...customerInfo };
      saveCheckoutToLocalStorage(state);
    },
    UPDATE_DELIVERY_INFO(state: CheckoutState, deliveryInfo: Partial<DeliveryInfo>) {
      state.delivery = { ...state.delivery, ...deliveryInfo };
      saveCheckoutToLocalStorage(state);
    },
    SET_TRANSACTION_ID(state: CheckoutState, id: string | null) {
        state.transactionId = id;
    },
    CLEAR_CHECKOUT_DATA(state: CheckoutState) {
            state.customer = { email: '', fullName: '', phoneNumber: '' };
            state.delivery = { address: '', city: '', country: '' };
            state.transactionId = null;
            localStorage.removeItem('checkoutCustomer');
            localStorage.removeItem('checkoutDelivery');
        },
  },
  actions: {
    updateCustomer({ commit }: any, customerInfo: Partial<CustomerInfo>) {
      commit('UPDATE_CUSTOMER_INFO', customerInfo);
    },
    updateDelivery({ commit }: any, deliveryInfo: Partial<DeliveryInfo>) {
      commit('UPDATE_DELIVERY_INFO', deliveryInfo);
    },
    clearCheckout({ commit }: any) {
        commit('CLEAR_CHECKOUT_DATA');
    },
    async initiateBackendCheckout({ commit, state, rootGetters }: any): Promise<string> {
        commit('SET_TRANSACTION_ID', null);
        const itemsFromCart: CartItem[] = rootGetters['cart/cartItems'];

        if (itemsFromCart.length === 0) {
            throw new Error("El carrito está vacío.");
        }

        const payload = {
            customer: state.customer,
            delivery: state.delivery,
            items: itemsFromCart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        };

        try {
            const transaction = await apiService.initiateCheckout(payload);
            commit('SET_TRANSACTION_ID', transaction.id);
            return transaction.id;
        } catch (error) {
            console.error("Error en Vuex action initiateBackendCheckout:", error);
            throw new Error("No se pudo iniciar la transacción en el backend.");
        }
    },

  },
  getters: {
    customerInfo: (state: CheckoutState): CustomerInfo => state.customer,
    deliveryInfo: (state: CheckoutState): DeliveryInfo => state.delivery,
    isCheckoutDataComplete: (state: CheckoutState): boolean => {
        return !!state.customer.email && !!state.customer.fullName && !!state.customer.phoneNumber && !!state.delivery.address && !!state.delivery.city;
    }
  },
};

export default checkoutModule;
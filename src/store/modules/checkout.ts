import type { RootState } from '@/store';

export interface CustomerInfo {
  email: string;
  name: string;
  phone: string;
}

export interface DeliveryInfo {
  address: string;
  city: string;
  country: string;
  postalCode: string;
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
        customer: customer ? JSON.parse(customer) : { email: '', name: '', phone: '' },
        delivery: delivery ? JSON.parse(delivery) : { address: '', city: '', country: '', postalCode: '' },
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
        state.customer = { email: '', name: '', phone: '' };
        state.delivery = { address: '', city: '', country: '', postalCode: '' };
        state.transactionId = null;
        localStorage.removeItem('checkoutCustomer');
        localStorage.removeItem('checkoutDelivery');
    }
  },
  actions: {
    updateCustomer({ commit }: any, customerInfo: Partial<CustomerInfo>) {
      commit('UPDATE_CUSTOMER_INFO', customerInfo);
    },
    updateDelivery({ commit }: any, deliveryInfo: Partial<DeliveryInfo>) {
      commit('UPDATE_DELIVERY_INFO', deliveryInfo);
    },
    // TODO: Implementar 'initiateCheckout'
    clearCheckout({ commit }: any) {
        commit('CLEAR_CHECKOUT_DATA');
    }
  },
  getters: {
    customerInfo: (state: CheckoutState): CustomerInfo => state.customer,
    deliveryInfo: (state: CheckoutState): DeliveryInfo => state.delivery,
    isCheckoutDataComplete: (state: CheckoutState): boolean => {
        return !!state.customer.email && !!state.customer.name && !!state.delivery.address && !!state.delivery.city;
    }
  },
};

export default checkoutModule;
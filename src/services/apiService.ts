import axios from 'axios';
import type { Product } from '@/store/modules/products';
import type { CustomerInfo, DeliveryInfo } from '@/store/modules/checkout';
import type { CartItem } from '@/store/modules/cart';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface CheckoutItemDto {
  productId: string;
  quantity: number;
}

interface InitiateCheckoutPayload {
  customer: CustomerInfo;
  delivery: DeliveryInfo;
  items: CheckoutItemDto[];
}

export interface TransactionDetailDto {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FAILED';
  amountInCents: number;
  currency: string;
  customer: CustomerInfo;
  delivery: DeliveryInfo;
  items: CartItem[];
  createdAt: string;
}

const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await apiClient.get<Product[]>('/products');
        return response.data;
    } catch (error) {
        console.error('API Error - getProducts:', error);
        throw error;
    }
};

const initiateCheckout = async (payload: InitiateCheckoutPayload): Promise<TransactionDetailDto> => {
  try {
    console.log("Enviando a /checkout/initiate:", payload);
    const response = await apiClient.post<TransactionDetailDto>('/checkout/initiate', payload);
    console.log("Respuesta de /checkout/initiate:", response.data);
    return response.data;
  } catch (error) {
    console.error('API Error - initiateCheckout:', error);
    throw error;
  }
};

export default {
  getProducts,
  initiateCheckout,
};
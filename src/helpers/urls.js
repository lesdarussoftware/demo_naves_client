import { VITE_APP_SERVER_URL } from "./env";

export const SERVER_URL = VITE_APP_SERVER_URL
export const API_URL = `${VITE_APP_SERVER_URL}/api`
export const AUTH_URL = `${API_URL}/auth`
export const CHECKOUT_URL = `${API_URL}/checkout`
export const PRODUCT_URL = `${API_URL}/products`
export const PAYMENT_URL = `${API_URL}/payments`
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8083/api';

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

export const PAYMENT_METHODS = {
  CARD: 'card',
  COD: 'cod'
};

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

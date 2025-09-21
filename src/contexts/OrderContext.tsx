import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  orderTime: Date;
  estimatedDelivery: Date;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
  restaurant: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: CartItem[], customerInfo: Order['customerInfo']) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const generateOrderId = () => {
    return 'ORD' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
  };

  const placeOrder = (items: CartItem[], customerInfo: Order['customerInfo']): Order => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderTime = new Date();
    const estimatedDelivery = new Date(orderTime.getTime() + 45 * 60 * 1000); // 45 minutes from now

    const newOrder: Order = {
      id: generateOrderId(),
      items,
      total,
      status: 'pending',
      orderTime,
      estimatedDelivery,
      customerInfo,
      restaurant: 'FoodCloud Restaurant'
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const getUserOrders = () => {
    return orders;
  };

  const value: OrderContextType = {
    orders,
    placeOrder,
    updateOrderStatus,
    getOrderById,
    getUserOrders,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
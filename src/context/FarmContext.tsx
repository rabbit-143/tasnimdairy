import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Order, SystemSettings, OrderStatus } from "../types";
import { api } from "../services/api";

interface FarmContextType {
  products: Product[];
  orders: Order[];
  settings: SystemSettings | null;
  loadingProducts: boolean;
  loadingOrders: boolean;
  loadingSettings: boolean;
  refreshProducts: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  refreshSettings: () => Promise<void>;
  addProduct: (product: Omit<Product, "id">) => Promise<Product>;
  updateProduct: (id: string, updatedFields: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<boolean>;
  createOrder: (orderData: Omit<Order, "id" | "createdAt" | "status">) => Promise<Order>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<Order>;
  updateSettings: (newSettings: SystemSettings) => Promise<SystemSettings>;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<SystemSettings | null>(null);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingSettings, setLoadingSettings] = useState(true);

  const refreshProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await api.fetchProducts();
      setProducts(data);
    } catch (e) {
      console.error("Error reading products list:", e);
    } finally {
      setLoadingProducts(false);
    }
  };

  const refreshOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await api.fetchOrders();
      setOrders(data);
    } catch (e) {
      console.error("Error fetching orders list:", e);
    } finally {
      setLoadingOrders(false);
    }
  };

  const refreshSettings = async () => {
    setLoadingSettings(true);
    try {
      const data = await api.fetchSettings();
      setSettings(data);
    } catch (e) {
      console.error("Error gathering settings parameters:", e);
    } finally {
      setLoadingSettings(false);
    }
  };

  useEffect(() => {
    refreshProducts();
    refreshOrders();
    refreshSettings();
  }, []);

  const addProduct = async (productData: Omit<Product, "id">): Promise<Product> => {
    const fresh = await api.createProduct(productData);
    await refreshProducts();
    return fresh;
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>): Promise<Product> => {
    const revised = await api.updateProduct(id, updatedFields);
    await refreshProducts();
    return revised;
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    const success = await api.deleteProduct(id);
    await refreshProducts();
    return success;
  };

  const createOrder = async (orderData: Omit<Order, "id" | "createdAt" | "status">): Promise<Order> => {
    const ord = await api.createOrder(orderData);
    await refreshOrders();
    await refreshProducts(); // Refresh products as well due to stock updates
    return ord;
  };

  const updateOrderStatus = async (id: string, status: OrderStatus): Promise<Order> => {
    const ord = await api.updateOrderStatus(id, status);
    await refreshOrders();
    return ord;
  };

  const updateSettings = async (newSettings: SystemSettings): Promise<SystemSettings> => {
    const saved = await api.saveSettings(newSettings);
    setSettings(saved);
    return saved;
  };

  const value: FarmContextType = {
    products,
    orders,
    settings,
    loadingProducts,
    loadingOrders,
    loadingSettings,
    refreshProducts,
    refreshOrders,
    refreshSettings,
    addProduct,
    updateProduct,
    deleteProduct,
    createOrder,
    updateOrderStatus,
    updateSettings
  };

  return <FarmContext.Provider value={value}>{children}</FarmContext.Provider>;
};

export const useFarm = () => {
  const ctx = useContext(FarmContext);
  if (!ctx) throw new Error("useFarm must be used within a FarmProvider");
  return ctx;
};

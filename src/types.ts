export type UserRole = "admin" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  password?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
  category: "dairy" | "sweets" | "agro";
  imageUrl: string;
  isFeatured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = "pending" | "processing" | "delivered" | "cancelled";

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: string;
  paymentTxId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface SystemSettings {
  logoUrl: string;
  bannerText: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  googleMapUrl: string;
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  businessHoursWeekdays: string;
  businessHoursWeekends: string;
  businessHoursDelivery: string;
}

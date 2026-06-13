import { User, Product, Order, SystemSettings, OrderStatus } from "../types";
import { siteConfig } from "../config/siteConfig";
import { contactConfig } from "../config/contactConfig";
import { socialConfig } from "../config/socialConfig";
import { LOGO, PRODUCT_IMAGES } from "../constants/assets";

// LocalStorage Keys
const KEYS = {
  PRODUCTS: "tasnim_products",
  USERS: "tasnim_users",
  ORDERS: "tasnim_orders",
  SETTINGS: "tasnim_settings",
  SESSION: "tasnim_session",
  CART: "tasnim_cart"
};

// Helper wait function to simulate network latency if needed (and guarantee returns are async)
const wait = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

// INITIALIZATION LOGIC FOR LOCALSTORAGE
export function initializeMockDatabase() {
  // 1. Initialize Users (including Super Admin)
  if (!localStorage.getItem(KEYS.USERS)) {
    const defaultUsers: User[] = [
      {
        id: "usr_admin",
        name: "Super Admin",
        email: "admin@tasnimdairy.com",
        phone: contactConfig.phone,
        role: "admin",
        password: "sup123"
      },
      {
        id: "usr_customer1",
        name: "Rashed Ahmed",
        email: "rashed@gmail.com",
        phone: "01711222333",
        role: "customer",
        password: "customer123"
      },
      {
        id: "usr_customer2",
        name: "Tanvir Alam",
        email: "tanvir@gmail.com",
        phone: "01811555666",
        role: "customer",
        password: "customer123"
      }
    ];
    localStorage.setItem(KEYS.USERS, JSON.stringify(defaultUsers));
  }

  // 2. Initialize Products
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    const defaultProducts: Product[] = [
      {
        id: "prod_milk_1l",
        name: "Pasteurized Fresh Raw Milk",
        description: "Pure, wholesome cattle milk filtered and chilled immediately after automated milking. 100% natural, creamy, and free from any preservatives.",
        price: 95,
        stock: 120,
        unit: "Liter",
        category: "dairy",
        imageUrl: PRODUCT_IMAGES.milk,
        isFeatured: true
      },
      {
        id: "prod_curd_1k",
        name: "Traditional Clay-Pot Curd (Dahi)",
        description: "Set in clay pots to absorb excess moisture, producing an incredibly thick, smooth, and delicious organic curd rich in healthy probiotics.",
        price: 280,
        stock: 45,
        unit: "kg Pot",
        category: "dairy",
        imageUrl: PRODUCT_IMAGES.curd,
        isFeatured: true
      },
      {
        id: "prod_ghee_500g",
        name: "Premium Golden Cow Ghee",
        description: "Slow-churned and boiled the old-fashioned way from organic cultured cream. Carries an exquisite nutty aroma and granular texture.",
        price: 750,
        stock: 35,
        unit: "500g Jar",
        category: "dairy",
        imageUrl: PRODUCT_IMAGES.ghee,
        isFeatured: true
      },
      {
        id: "prod_rasgulla_12",
        name: "Traditional Bengali Rasgulla",
        description: "Soft, spongy cottage-cheese balls dipped in sweet, warm cardamon-infused sugar syrup. Handcrafted on our farm sweet shop daily.",
        price: 320,
        stock: 18,
        unit: "12 pcs Box",
        category: "sweets",
        imageUrl: PRODUCT_IMAGES.sweets,
        isFeatured: true
      },
      {
        id: "prod_sandesh_500g",
        name: "Premium Nolen Gur Shondesh",
        description: "Premium melt-in-the-mouth Bengali milk fudge flavored with seasonal sugarcane juice. Made exclusively from freshly squeezed cow chhana.",
        price: 450,
        stock: 15,
        unit: "500g Box",
        category: "sweets",
        imageUrl: PRODUCT_IMAGES.sweets,
        isFeatured: false
      },
      {
        id: "prod_beef_1k",
        name: "Organic Premium Grass-fed Beef",
        description: "Premium tender cuts of beef sourced from grass-fed and meticulously inspected cattle on our farm. Completely organic, hygienic, and fresh.",
        price: 820,
        stock: 60,
        unit: "kg",
        category: "agro",
        imageUrl: PRODUCT_IMAGES.beef,
        isFeatured: true
      },
      {
        id: "prod_milk_5l",
        name: "Bulk Pasteurized Fresh Milk",
        description: "Convenient bulk can size for families, events, or local sweet making. Straight from our automatic dairy farm coolers.",
        price: 450,
        stock: 50,
        unit: "5 Liters Can",
        category: "dairy",
        imageUrl: PRODUCT_IMAGES.milk,
        isFeatured: false
      }
    ];
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(defaultProducts));
  }

  // 3. Initialize Settings
  if (!localStorage.getItem(KEYS.SETTINGS)) {
    const defaultSettings: SystemSettings = {
      logoUrl: LOGO,
      bannerText: siteConfig.promoText,
      phone: contactConfig.phone,
      whatsapp: contactConfig.whatsapp,
      email: contactConfig.email,
      address: contactConfig.address,
      googleMapUrl: contactConfig.googleMapUrl,
      facebook: socialConfig.facebook,
      instagram: socialConfig.instagram,
      youtube: socialConfig.youtube,
      tiktok: socialConfig.tiktok,
      businessHoursWeekdays: contactConfig.businessHours.weekdays,
      businessHoursWeekends: contactConfig.businessHours.weekends,
      businessHoursDelivery: contactConfig.businessHours.delivery
    };
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(defaultSettings));
  }

  // 4. Initialize Orders
  if (!localStorage.getItem(KEYS.ORDERS)) {
    const defaultOrders: Order[] = [
      {
        id: "ORD-8923",
        customerName: "Rashed Ahmed",
        customerEmail: "rashed@gmail.com",
        customerPhone: "01711222333",
        customerAddress: "Dhanmondi, Road 27, House 5A, Dhaka",
        paymentMethod: "bKash",
        paymentTxId: "BK9X34Y92D",
        items: [
          {
            productId: "prod_milk_1l",
            name: "Pasteurized Fresh Raw Milk",
            price: 95,
            quantity: 4
          },
          {
            productId: "prod_ghee_500g",
            name: "Premium Golden Cow Ghee",
            price: 750,
            quantity: 1
          }
        ],
        totalAmount: 1130,
        status: "delivered",
        createdAt: "2026-06-10T10:45:00Z"
      },
      {
        id: "ORD-9104",
        customerName: "Tanvir Alam",
        customerEmail: "tanvir@gmail.com",
        customerPhone: "01811555666",
        customerAddress: "Savar Bus Stand Market Area, Dhaka",
        paymentMethod: "Nagad",
        paymentTxId: "NG7Y12R82P",
        items: [
          {
            productId: "prod_curd_1k",
            name: "Traditional Clay-Pot Curd (Dahi)",
            price: 280,
            quantity: 1
          },
          {
            productId: "prod_rasgulla_12",
            name: "Traditional Bengali Rasgulla",
            price: 320,
            quantity: 1
          }
        ],
        totalAmount: 600,
        status: "processing",
        createdAt: "2026-06-11T14:20:00Z"
      },
      {
        id: "ORD-9426",
        customerName: "Mim Sultana",
        customerEmail: "mim@gmail.com",
        customerPhone: "01999888777",
        customerAddress: "Uttara Sector 4, Road 11, House 9, Dhaka",
        paymentMethod: "Bank Transfer (Eastern Bank Ltd / EBL)",
        paymentTxId: "EBL-TR-918204",
        items: [
          {
            productId: "prod_beef_1k",
            name: "Organic Premium Grass-fed Beef",
            price: 820,
            quantity: 2
          },
          {
            productId: "prod_milk_1l",
            name: "Pasteurized Fresh Raw Milk",
            price: 95,
            quantity: 2
          }
        ],
        totalAmount: 1830,
        status: "pending",
        createdAt: "2026-06-12T09:15:00Z"
      }
    ];
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(defaultOrders));
  }
}

// Ensure init happens
initializeMockDatabase();

// API SERVICES IMPLEMENTATION
export const api = {
  // PRODUCTS
  async fetchProducts(): Promise<Product[]> {
    await wait(80);
    const data = localStorage.getItem(KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  async createProduct(product: Omit<Product, "id">): Promise<Product> {
    await wait(100);
    const products = await this.fetchProducts();
    const newProduct: Product = {
      ...product,
      id: "prod_" + Date.now().toString()
    };
    products.push(newProduct);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    return newProduct;
  },

  async updateProduct(id: string, updatedFields: Partial<Product>): Promise<Product> {
    await wait(100);
    const products = await this.fetchProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");
    const updated: Product = { ...products[index], ...updatedFields };
    products[index] = updated;
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
    return updated;
  },

  async deleteProduct(id: string): Promise<boolean> {
    await wait(100);
    const products = await this.fetchProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(filtered));
    return true;
  },

  // USERS / AUTH
  async registerUser(user: Omit<User, "id" | "role"> & { password?: string }): Promise<User> {
    await wait(150);
    const usersStr = localStorage.getItem(KEYS.USERS) || "[]";
    const users: User[] = JSON.parse(usersStr);

    const exists = users.find(u => u.email === user.email);
    if (exists) throw new Error("Email already registered");

    const newUser: User = {
      ...user,
      id: "usr_" + Date.now().toString(),
      role: "customer"
    };
    users.push(newUser);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    return newUser;
  },

  async loginUser(identity: string, password: string): Promise<User> {
    await wait(150);
    const usersStr = localStorage.getItem(KEYS.USERS) || "[]";
    const users: User[] = JSON.parse(usersStr);

    // Look for exact match (by email, phone or username)
    const matched = users.find(u => 
      (u.email.toLowerCase() === identity.toLowerCase() || 
       u.name.toLowerCase() === identity.toLowerCase() || 
       u.phone === identity) && 
      u.password === password
    );

    if (!matched) {
      throw new Error("Invalid username/email or password");
    }

    // Save session
    localStorage.setItem(KEYS.SESSION, JSON.stringify(matched));
    return matched;
  },

  async logoutUser(): Promise<boolean> {
    await wait(50);
    localStorage.removeItem(KEYS.SESSION);
    return true;
  },

  async getSession(): Promise<User | null> {
    await wait(20);
    const session = localStorage.getItem(KEYS.SESSION);
    return session ? JSON.parse(session) : null;
  },

  // ORDERS
  async fetchOrders(): Promise<Order[]> {
    await wait(80);
    const data = localStorage.getItem(KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  async createOrder(orderData: Omit<Order, "id" | "createdAt" | "status">): Promise<Order> {
    await wait(120);
    const orders = await this.fetchOrders();
    const newOrder: Order = {
      ...orderData,
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000).toString(),
      status: "pending",
      createdAt: new Date().toISOString()
    };
    orders.unshift(newOrder); // Add to the top of list
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));

    // Deduct stock of products
    const products = await this.fetchProducts();
    orderData.items.forEach(orderItem => {
      const pIndex = products.findIndex(p => p.id === orderItem.productId);
      if (pIndex !== -1) {
        products[pIndex].stock = Math.max(0, products[pIndex].stock - orderItem.quantity);
      }
    });
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));

    return newOrder;
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    await wait(80);
    const orders = await this.fetchOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) throw new Error("Order not found");
    orders[index].status = status;
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    return orders[index];
  },

  // SETTINGS
  async fetchSettings(): Promise<SystemSettings> {
    await wait(50);
    const data = localStorage.getItem(KEYS.SETTINGS);
    if (!data) {
      // Reinitialize if missing
      initializeMockDatabase();
      return JSON.parse(localStorage.getItem(KEYS.SETTINGS)!);
    }
    return JSON.parse(data);
  },

  async saveSettings(settings: SystemSettings): Promise<SystemSettings> {
    await wait(100);
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    return settings;
  }
};

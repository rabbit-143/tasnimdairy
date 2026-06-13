import { api } from "./api";
import { Product } from "../types";

export const productService = {
  fetchProducts: (): Promise<Product[]> => {
    return api.fetchProducts();
  },

  createProduct: (product: Omit<Product, "id">): Promise<Product> => {
    return api.createProduct(product);
  },

  updateProduct: (id: string, updatedFields: Partial<Product>): Promise<Product> => {
    return api.updateProduct(id, updatedFields);
  },

  deleteProduct: (id: string): Promise<boolean> => {
    return api.deleteProduct(id);
  }
};

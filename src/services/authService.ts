import { api } from "./api";
import { User } from "../types";

export const authService = {
  registerUser: (user: Omit<User, "id" | "role"> & { password?: string }): Promise<User> => {
    return api.registerUser(user);
  },

  loginUser: (identity: string, password: string): Promise<User> => {
    return api.loginUser(identity, password);
  },

  logoutUser: (): Promise<boolean> => {
    return api.logoutUser();
  },

  getSession: (): Promise<User | null> => {
    return api.getSession();
  }
};

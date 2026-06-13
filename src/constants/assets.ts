import { assetsConfig, getAsset } from "../config/assetsConfig";

export const LOGO = "/assets/logos/logo.png";
export const LOGO_LIGHT = "/assets/logos/logo-light.png";
export const FAVICON = "/assets/logos/favicon.ico";

export const HERO_IMAGES = {
  hero1: getAsset("hero", "hero1"),
  hero2: getAsset("hero", "hero2"),
  hero3: getAsset("hero", "hero3")
};

export const PRODUCT_IMAGES = {
  milk: getAsset("products", "milk"),
  curd: getAsset("products", "curd"),
  ghee: getAsset("products", "ghee"),
  sweets: getAsset("products", "sweets"),
  beef: getAsset("products", "beef"),
  placeholder: getAsset("placeholders", "product")
};

export const CATEGORY_IMAGES = {
  dairy: getAsset("categories", "dairy"),
  sweets: getAsset("categories", "sweets"),
  agro: getAsset("categories", "agro")
};

export const GALLERY_IMAGES = {
  farm1: getAsset("gallery", "farm1"),
  farm2: getAsset("gallery", "farm2"),
  farm3: getAsset("gallery", "farm3")
};

export const PAYMENT_IMAGES = {
  bkash: "/assets/payments/bkash.png",
  nagad: "/assets/payments/nagad.png",
  rocket: "/assets/payments/rocket.png",
  upay: "/assets/payments/upay.png",
  bank: "/assets/payments/bank.png"
};

export const PLACEHOLDER_IMAGES = {
  product: "/assets/placeholders/product-placeholder.jpg",
  avatar: "/assets/placeholders/avatar-placeholder.jpg"
};

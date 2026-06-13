// Asset Paths schema matching the exact public/assets subdirectory structure
export const assetsConfig = {
  logos: {
    logo: "/assets/logos/logo.png",
    logoLight: "/assets/logos/logo-light.png",
    favicon: "/assets/logos/favicon.ico"
  },
  hero: {
    hero1: "/assets/hero/hero-1.jpg",
    hero2: "/assets/hero/hero-2.jpg",
    hero3: "/assets/hero/hero-3.jpg"
  },
  products: {
    milk: "/assets/products/milk.jpg",
    curd: "/assets/products/curd.jpg",
    ghee: "/assets/products/ghee.jpg",
    sweets: "/assets/products/sweets.jpg",
    beef: "/assets/products/beef.jpg",
    placeholder: "/assets/placeholders/product-placeholder.jpg"
  },
  categories: {
    dairy: "/assets/categories/dairy.jpg",
    sweets: "/assets/categories/sweets.jpg",
    agro: "/assets/categories/agro.jpg"
  },
  banners: {
    promoBanner: "/assets/banners/promo-banner.jpg",
    offerBanner: "/assets/banners/offer-banner.jpg"
  },
  gallery: {
    farm1: "/assets/gallery/farm-1.jpg",
    farm2: "/assets/gallery/farm-2.jpg",
    farm3: "/assets/gallery/farm-3.jpg"
  },
  payments: {
    bkash: "/assets/payments/bkash.png",
    nagad: "/assets/payments/nagad.png",
    rocket: "/assets/payments/rocket.png",
    upay: "/assets/payments/upay.png",
    bank: "/assets/payments/bank.png"
  },
  placeholders: {
    product: "/assets/placeholders/product-placeholder.jpg",
    avatar: "/assets/placeholders/avatar-placeholder.jpg"
  }
};

// Premium Unsplash CDN Backdrops for a stunning live preview, completely matching a luxurious organic farm visual style.
export const previewAssets = {
  logos: {
    logo: "/assets/logos/logo.png", // Keep our personalized AI generated golden logo
    logoLight: "/assets/logos/logo-light.png",
    favicon: "/assets/logos/favicon.ico"
  },
  hero: {
    hero1: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=1600&auto=format&fit=crop&q=80", // Pristine dairy cow pasture
    hero2: "https://images.unsplash.com/photo-1548550022-cbf5174001cf?w=1600&auto=format&fit=crop&q=80", // Fresh milk canister & rustic bottles
    hero3: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&auto=format&fit=crop&q=80"  // Modern high hygiene farm sunset
  },
  products: {
    milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80", // Glass milk bottles
    curd: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80", // Traditional curd in clay pot form
    ghee: "https://images.unsplash.com/photo-1589135013733-1fcfbf0d30fe?w=600&auto=format&fit=crop&q=80", // High quality butter ghee
    sweets: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80", // Elegant traditional sweets
    beef: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80", // Premium beef steak tender cuts
    placeholder: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80"
  },
  categories: {
    dairy: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop&q=80", // Dairy splash
    sweets: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80", // Pastries & milk sweets
    agro: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80"  // Beautiful farm landscape
  },
  banners: {
    promoBanner: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&auto=format&fit=crop&q=80",
    offerBanner: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&auto=format&fit=crop&q=80"
  },
  gallery: {
    farm1: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&auto=format&fit=crop&q=80",
    farm2: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
    farm3: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&auto=format&fit=crop&q=80"
  }
};

// Select assets strategy: in rendering we prefer high quality Preview Assets for the UI showcase, but the original config contains local build ready variables.
export const getAsset = (category: keyof typeof assetsConfig, item: string): string => {
  try {
    // If we have a preview asset URL, we use it for maximum visual polish, but default to local assets
    const prev = (previewAssets as any)[category]?.[item];
    if (prev) return prev;
    return (assetsConfig as any)[category]?.[item] || "";
  } catch (e) {
    return "";
  }
};

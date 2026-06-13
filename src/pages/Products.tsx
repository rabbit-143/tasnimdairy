import React, { useState } from "react";
import { useFarm } from "../context/FarmContext";
import { useCart } from "../context/CartContext";
import { Product } from "../types";
import { Search, ShoppingBag, X, Heart, Sparkles, Filter, CheckCircle } from "lucide-react";

export const Products: React.FC = () => {
  const { products, loadingProducts } = useFarm();
  const { addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "dairy" | "sweets" | "agro">("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewQuantity, setQuickViewQuantity] = useState(1);

  // Filter Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenQuickView = (p: Product) => {
    setQuickViewProduct(p);
    setQuickViewQuantity(1);
  };

  const handleQuickViewAdd = () => {
    if (quickViewProduct) {
      addToCart(quickViewProduct, quickViewQuantity);
      setQuickViewProduct(null);
    }
  };

  return (
    <div id="product-catalog-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 animate-fade-in">
      
      {/* 1. Header Hero section */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <span className="text-secondary font-display font-extrabold text-xs tracking-widest uppercase bg-secondary/10 px-3.5 py-1.5 rounded-full border border-secondary/15">
          Pure & Untouched
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-primary tracking-tight">
          Tasnim Farm Store
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Order premium organic cow milk, clay pot curd, authentic golden ghee, and handcrafted sweets online. Free temperature-chilled delivery within Dhaka.
        </p>
      </div>

      {/* 2. Control center: Search and Filtering tab triggers */}
      <div id="catalog-control-center" className="flex flex-col md:flex-row gap-5 justify-between items-center bg-white p-5 rounded-2xl border border-gray-150 shadow-3xs">
        
        {/* Search Input */}
        <div className="relative w-full md:max-w-sm flex items-center">
          <Search size={16} className="absolute left-4 text-gray-400" />
          <input
            id="catalog-search"
            type="text"
            className="w-full text-xs font-semibold bg-gray-50/70 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 focus:border-primary focus:outline-none focus:bg-white transition-all text-gray-700"
            placeholder="Search raw milk, cow ghee, clay pot dahi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 p-1 rounded-full text-gray-400 hover:bg-gray-150 hover:text-gray-700"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Categories trigger buttons */}
        <div id="category-tab-triggers" className="flex gap-2 flex-wrap justify-center w-full md:w-auto">
          {([
            { id: "all", label: "All Items" },
            { id: "dairy", label: "Pure Dairy" },
            { id: "sweets", label: "Artisanal Sweets" },
            { id: "agro", label: "Agro & Beef" }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === tab.id
                  ? "bg-primary text-white border border-primary shadow-sm"
                  : "bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-550 border border-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* 3. Catalog Listing grid */}
      {loadingProducts ? (
        <div className="text-center py-20 space-y-3">
          <div className="w-10 h-10 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-primary">Harvesting inventory items...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div id="catalog-no-results" className="text-center py-20 bg-white rounded-3xl p-8 border border-gray-100 text-gray-400 space-y-3 max-w-sm mx-auto">
          <Filter size={32} className="mx-auto text-gray-300" />
          <h3 className="font-display font-extrabold text-gray-650">No products matched</h3>
          <p className="text-xs">
            Refine your spelling search or shift filter categories to discover items.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="bg-primary text-white text-3xs font-bold py-2 px-4 rounded-full"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div id="catalog-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((p) => {
            const isOutOfStock = p.stock === 0;
            return (
              <div
                key={p.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-3xs overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image panel */}
                <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-50">
                  {p.isFeatured && (
                    <span className="absolute top-3 left-3 bg-secondary text-primary font-display font-medium text-3xs font-black py-1 px-2.5 rounded-full z-10 uppercase shadow-xs">
                      Premium
                    </span>
                  )}
                  {isOutOfStock ? (
                    <span className="absolute inset-0 bg-white/70 backdrop-blur-3xs z-10 flex items-center justify-center font-bold text-gray-450 uppercase text-xs">
                      STOCK RUN OUT
                    </span>
                  ) : p.stock <= 5 ? (
                    <span className="absolute top-3 right-3 bg-red-100 text-red-700 font-bold text-3xs py-1 px-2.5 rounded-full z-10 uppercase">
                      LOW STOCK: {p.stock} units
                    </span>
                  ) : null}

                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    onClick={() => handleOpenQuickView(p)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info and button panel */}
                <div className="p-5 flex-grow flex flex-col space-y-2">
                  <span className="text-3xs font-extrabold uppercase text-secondary tracking-widest leading-none">
                    {p.category}
                  </span>
                  <h3
                    onClick={() => handleOpenQuickView(p)}
                    className="font-display font-extrabold text-gray-800 text-sm hover:text-primary transition-colors cursor-pointer line-clamp-1"
                  >
                    {p.name}
                  </h3>
                  <p className="text-2xs text-gray-400 line-clamp-2 h-7.5 leading-normal">
                    {p.description}
                  </p>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-50 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-primary font-display font-extrabold text-base leading-none">
                        {p.price} BDT
                      </span>
                      <span className="text-3xs text-gray-450 mt-1 uppercase leading-none font-bold">
                        per {p.unit}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenQuickView(p)}
                        className="p-2 border border-gray-150 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-700 transition-all"
                        aria-label="Quick View detail"
                      >
                        👁️
                      </button>

                      <button
                        onClick={() => addToCart(p, 1)}
                        disabled={isOutOfStock}
                        className={`text-3xs font-extrabold tracking-wider uppercase px-4 py-2.5 rounded-full shadow-sm transition-all ${
                          isOutOfStock
                            ? "bg-gray-100 text-gray-300 pointer-events-none"
                            : "bg-primary hover:bg-primary-light text-white hover:text-secondary"
                        }`}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. QUICK VIEW MODAL COMPONENT WINDOW */}
      {quickViewProduct && (
        <div id="quick-view-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div className="absolute inset-0 bg-primary/45 backdrop-blur-xs" onClick={() => setQuickViewProduct(null)} />

          {/* Dialog block */}
          <div className="relative bg-farm-cream w-full max-w-2xl rounded-2xl shadow-2xl border border-secondary/15 p-6 md:p-8 overflow-hidden z-10 flex flex-col md:flex-row gap-6">
            
            {/* Close trigger */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-850 hover:bg-gray-100 transition-all z-20 bg-white/80"
              aria-label="Close details"
            >
              <X size={16} />
            </button>

            {/* Product Image pane */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-80 rounded-xl overflow-hidden bg-white border border-gray-100 relative shadow-inner">
              <span className="absolute top-3 left-3 bg-primary text-secondary font-display font-medium text-3xs font-black py-1 px-2.5 rounded-full z-10 uppercase tracking-widest select-none">
                {quickViewProduct.category}
              </span>
              <img
                src={quickViewProduct.imageUrl}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Product details and actions */}
            <div className="w-full md:w-1/2 flex flex-col space-y-4">
              <div className="space-y-1">
                <h2 className="font-display font-extrabold text-primary text-lg sm:text-xl leading-tight">
                  {quickViewProduct.name}
                </h2>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-secondary font-bold text-sm tracking-wide">
                    {quickViewProduct.price} BDT / {quickViewProduct.unit}
                  </span>
                  
                  <span className={`text-3xs font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    quickViewProduct.stock > 0 
                      ? "bg-green-50 text-green-700" 
                      : "bg-red-550 text-red-700"
                  }`}>
                    {quickViewProduct.stock > 0 ? `In Stock: ${quickViewProduct.stock} units` : "Out Of Stock"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-3xs text-gray-400 font-extrabold uppercase tracking-widest block">
                  Product Description
                </span>
                <p className="text-xs text-gray-500 leading-relaxed max-h-32 overflow-y-auto pr-2 no-scrollbar">
                  {quickViewProduct.description}
                </p>
              </div>

              {/* Extra clinical points */}
              <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 text-3xs space-y-1 text-gray-600 leading-normal">
                <div className="flex items-center space-x-2 text-primary font-bold">
                  <Sparkles size={11} className="text-secondary" />
                  <span>Clinical Hygiene Guarantee:</span>
                </div>
                <p>
                  Vacuum pipeline handled. Zero bacterial exposure. Pasteurized under strict hospital-level hygiene codes to retain original nutritional compounds.
                </p>
              </div>

              {/* Quantity selector & Add triggers */}
              {quickViewProduct.stock > 0 && (
                <div className="space-y-3 pt-2 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-3xs font-extrabold text-gray-400 uppercase tracking-widest">
                      Select Quantity
                    </span>
                    
                    <div className="flex items-center space-x-2 bg-gray-50 py-1 px-2.5 rounded-lg border border-gray-150">
                      <button
                        onClick={() => setQuickViewQuantity(prev => Math.max(1, prev - 1))}
                        className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-all"
                      >
                        <X size={10} className="stroke-[3px]" />
                      </button>
                      <span className="font-mono text-xs font-bold w-6 text-center text-gray-800">
                        {quickViewQuantity}
                      </span>
                      <button
                        onClick={() => setQuickViewQuantity(prev => Math.min(quickViewProduct.stock, prev + 1))}
                        disabled={quickViewQuantity >= quickViewProduct.stock}
                        className={`p-1 rounded transition-all ${
                          quickViewQuantity >= quickViewProduct.stock 
                            ? "text-gray-200" 
                            : "text-gray-400 hover:text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        ➕
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleQuickViewAdd}
                    className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3 rounded-xl hover:text-secondary shadow-md transition-all text-xs uppercase tracking-widest flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag size={14} />
                    <span>Add to shopping basket</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

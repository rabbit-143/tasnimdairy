import React, { useState } from "react";
import { useFarm } from "../../context/FarmContext";
import { Product, Order, SystemSettings } from "../../types";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  Settings as SettingsIcon,
  Plus,
  Trash2,
  Edit3,
  X,
  Sparkles,
  Search,
  DollarSign,
  CheckCircle
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    settings,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateSettings
  } = useFarm();

  // Navigation tab of Admin console
  const [activeTab, setActiveTab] = useState<"analytics" | "products" | "orders" | "customers" | "settings">("analytics");

  // PRODUCT TAB STATE CARD
  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [prodSearch, setProdSearch] = useState("");
  const [prodCategoryFilter, setProdCategoryFilter] = useState<string>("all");

  // Product form inputs
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formPrice, setFormPrice] = useState(100);
  const [formStock, setFormStock] = useState(50);
  const [formUnit, setFormUnit] = useState("Unit");
  const [formCategory, setFormCategory] = useState<"dairy" | "sweets" | "agro">("dairy");
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formImageUrl, setFormImageUrl] = useState("");

  // SETTINGS TAB STATE CARD
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [setSuccessMsg, setSetSuccessMsg] = useState("");
  const [setLogo, setSetLogo] = useState(settings?.logoUrl || "");
  const [setBanner, setSetBanner] = useState(settings?.bannerText || "");
  const [setPhone, setSetPhone] = useState(settings?.phone || "");
  const [setWhatsapp, setSetWhatsapp] = useState(settings?.whatsapp || "");
  const [setEmail, setSetEmail] = useState(settings?.email || "");
  const [setAddress, setSetAddress] = useState(settings?.address || "");
  const [setMapLink, setSetMapLink] = useState(settings?.googleMapUrl || "");
  const [setFacebook, setSetFacebook] = useState(settings?.facebook || "");
  const [setInstagram, setSetInstagram] = useState(settings?.instagram || "");
  const [setYoutube, setSetYoutube] = useState(settings?.youtube || "");
  const [setTiktok, setSetTiktok] = useState(settings?.tiktok || "");
  const [setHoursWeekdays, setSetHoursWeekdays] = useState(settings?.businessHoursWeekdays || "");
  const [setHoursWeekends, setSetHoursWeekends] = useState(settings?.businessHoursWeekends || "");
  const [setHoursDelivery, setSetHoursDelivery] = useState(settings?.businessHoursDelivery || "");

  // Sync settings inputs when loaded
  React.useEffect(() => {
    if (settings) {
      setSetLogo(settings.logoUrl);
      setSetBanner(settings.bannerText);
      setSetPhone(settings.phone);
      setSetWhatsapp(settings.whatsapp);
      setSetEmail(settings.email);
      setSetAddress(settings.address);
      setSetMapLink(settings.googleMapUrl);
      setSetFacebook(settings.facebook);
      setSetInstagram(settings.instagram);
      setSetYoutube(settings.youtube);
      setSetTiktok(settings.tiktok);
      setSetHoursWeekdays(settings.businessHoursWeekdays);
      setSetHoursWeekends(settings.businessHoursWeekends);
      setSetHoursDelivery(settings.businessHoursDelivery);
    }
  }, [settings]);

  // ORDERS DYNAMIC FILTER
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");
  const [orderSearch, setOrderSearch] = useState("");

  // PRODUCT CRUD HANDLERS
  const startCreateProduct = () => {
    setIsCreatingProduct(true);
    setEditingProdId(null);
    setFormName("");
    setFormDesc("");
    setFormPrice(100);
    setFormStock(50);
    setFormUnit("Liter");
    setFormCategory("dairy");
    setFormIsFeatured(false);
    setFormImageUrl("https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80");
  };

  const startEditProduct = (p: Product) => {
    setEditingProdId(p.id);
    setIsCreatingProduct(true);
    setFormName(p.name);
    setFormDesc(p.description);
    setFormPrice(p.price);
    setFormStock(p.stock);
    setFormUnit(p.unit);
    setFormCategory(p.category);
    setFormIsFeatured(p.isFeatured);
    setFormImageUrl(p.imageUrl);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formDesc.trim() || formPrice <= 0 || formStock < 0) {
      alert("Invalid inputs, verify field criteria");
      return;
    }

    try {
      const productPayload = {
        name: formName,
        description: formDesc,
        price: Number(formPrice),
        stock: Number(formStock),
        unit: formUnit,
        category: formCategory,
        isFeatured: formIsFeatured,
        imageUrl: formImageUrl || "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=650&auto=format&fit=crop&q=80"
      };

      if (editingProdId) {
        await updateProduct(editingProdId, productPayload);
      } else {
        await addProduct(productPayload);
      }

      setIsCreatingProduct(false);
      setEditingProdId(null);
    } catch (err: any) {
      alert(err.message || "Operation failed");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this farm item?")) {
      await deleteProduct(id);
    }
  };

  // REVENUE CALCULATOR SIMULATION
  const totalProducts = products.length;
  const totalOrdersCount = orders.length;
  const uniqueCustomersCount = Array.from(new Set(orders.map(o => o.customerEmail))).length || 4;

  const totalRevenue = orders
    .filter(o => o.status === "delivered" || o.status === "processing")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(prodSearch.toLowerCase()) || p.description.toLowerCase().includes(prodSearch.toLowerCase());
    const matchCategory = prodCategoryFilter === "all" || p.category === prodCategoryFilter;
    return matchSearch && matchCategory;
  });

  const filteredOrders = orders.filter(o => {
    const matchSearch = o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) || 
                        o.customerPhone.includes(orderSearch) || 
                        o.id.toLowerCase().includes(orderSearch.toLowerCase());
    const matchStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
    return matchSearch && matchStatus;
  });

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSetSuccessMsg("");

    try {
      const updated: SystemSettings = {
        logoUrl: setLogo,
        bannerText: setBanner,
        phone: setPhone,
        whatsapp: setWhatsapp,
        email: setEmail,
        address: setAddress,
        googleMapUrl: setMapLink,
        facebook: setFacebook,
        instagram: setInstagram,
        youtube: setYoutube,
        tiktok: setTiktok,
        businessHoursWeekdays: setHoursWeekdays,
        businessHoursWeekends: setHoursWeekends,
        businessHoursDelivery: setHoursDelivery
      };
      await updateSettings(updated);
      setSetSuccessMsg("Settings updated and synchronized successfully!");
      setTimeout(() => setSetSuccessMsg(""), 3500);
    } catch (e: any) {
      alert("Breakdown in saving settings setup");
    } finally {
      setIsSavingSettings(false);
    }
  };

  return (
    <div id="admin-dashboard-container" className="space-y-8">
      {/* Tab Navigation header cards */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-150 shadow-3xs">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-primary leading-tight flex items-center">
            <Sparkles size={20} className="mr-2 text-secondary" />
            Tasnim Administration Console
          </h1>
          <p className="text-xs text-gray-400">
            Audit orders, update pasture pricing schedules, regulate catalog stock, and configure dynamic site parameters.
          </p>
        </div>

        {/* Tab triggers group */}
        <div id="admin-tab-triggers" className="flex flex-wrap gap-1.5 p-1 bg-gray-50 rounded-xl border border-gray-150">
          {([
            { id: "analytics", label: "Analytics", icon: <TrendingUp size={14} /> },
            { id: "products", label: "Products Catalog", icon: <Package size={14} /> },
            { id: "orders", label: "Orders Hub", icon: <ShoppingCart size={14} /> },
            { id: "customers", label: "Customers list", icon: <Users size={14} /> },
            { id: "settings", label: "System Config", icon: <SettingsIcon size={14} /> }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsCreatingProduct(false);
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-soft"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: ANALYTICS METRICS */}
      {activeTab === "analytics" && (
        <div id="admin-analytics-tab" className="space-y-8">
          
          {/* Card Summary Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-3xs flex justify-between items-center bg-gradient-to-br from-white to-primary/5">
              <div className="space-y-1">
                <span className="text-4xs font-extrabold text-gray-400 uppercase tracking-widest block font-bold">DYNAMIC REVENUE</span>
                <p className="text-2xl font-display font-black text-primary leading-none">{totalRevenue} BDT</p>
                <span className="text-[10px] text-green-600 font-bold block">Simulated Sales Gross</span>
              </div>
              <div className="p-3.5 bg-primary/10 rounded-xl text-primary font-bold">
                <DollarSign size={22} className="text-secondary" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-3xs flex justify-between items-center bg-gradient-to-br from-white to-secondary/5">
              <div className="space-y-1">
                <span className="text-4xs font-extrabold text-gray-400 uppercase tracking-widest block font-bold">TOTAL ORDERS</span>
                <p className="text-2xl font-display font-black text-gray-800 leading-none">{totalOrdersCount}</p>
                <span className="text-[10px] text-gray-400 font-bold block">Complete checkout streams</span>
              </div>
              <div className="p-3.5 bg-secondary/15 rounded-xl text-secondary-dark">
                <ShoppingCart size={22} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-3xs flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-4xs font-extrabold text-gray-400 uppercase tracking-widest block font-bold">ACTIVE CATALOG</span>
                <p className="text-2xl font-display font-black text-gray-800 leading-none">{totalProducts}</p>
                <span className="text-[10px] text-gray-400 font-semibold block">Hygienic products cataloged</span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl text-gray-400">
                <Package size={22} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-3xs flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-4xs font-extrabold text-gray-400 uppercase tracking-widest block font-bold">FARM REGISTRY</span>
                <p className="text-2xl font-display font-black text-gray-800 leading-none">{uniqueCustomersCount}</p>
                <span className="text-[10px] text-gray-400 font-semibold block">Retained registered accounts</span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl text-gray-400">
                <Users size={22} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-155 shadow-3xs p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-55 pb-4">
                <h3 className="font-display font-extrabold text-gray-850 text-sm">
                  Recent Orders Feed
                </h3>
                <span className="text-3xs font-extrabold text-primary bg-primary/5 px-2.5 py-1 rounded-full uppercase">
                  Auditing Log active
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-500 border-collapse">
                  <thead>
                    <tr className="bg-gray-50 font-bold text-gray-700 uppercase text-3xs border-b border-gray-100">
                      <th className="py-3 px-4">ORDER ID</th>
                      <th className="py-3 px-4">DATE</th>
                      <th className="py-3 px-4">CUSTOMER</th>
                      <th className="py-3 px-4">TOTAL</th>
                      <th className="py-3 px-4">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-gray-55/50">
                        <td className="py-3.5 px-4 font-mono font-bold text-primary">{ord.id}</td>
                        <td className="py-3.5 px-4">{new Date(ord.createdAt).toLocaleDateString()}</td>
                        <td className="py-3.5 px-4">{ord.customerName}</td>
                        <td className="py-3.5 px-4 font-bold text-gray-800">{ord.totalAmount} BDT</td>
                        <td className="py-3.5 px-4">
                          <span className={`text-4xs font-bold px-2 py-0.5 rounded uppercase ${
                            ord.status === "delivered" ? "bg-green-100 text-green-700" :
                            ord.status === "processing" ? "bg-blue-1050 bg-blue-100 text-blue-700" :
                            ord.status === "cancelled" ? "bg-red-100 text-red-700" :
                            "bg-yellow-105 bg-yellow-101 text-yellow-700"
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-150 shadow-3xs p-6 space-y-6">
              <h3 className="font-display font-extrabold text-gray-800 text-sm border-b border-gray-50 pb-4">
                Category Yield Share
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Pure Fresh Dairy Products", share: "55%", color: "bg-primary" },
                  { label: "Handcrafted Bengali Sweets", share: "30%", color: "bg-secondary" },
                  { label: "Organic Agro & Red Beef", share: "15%", color: "bg-gray-400" }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-655">{item.label}</span>
                      <span className="font-bold text-primary">{item.share}</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: item.share }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: PRODUCTS CATALOG */}
      {activeTab === "products" && (
        <div id="admin-products-tab" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-5 rounded-2xl border border-gray-150 shadow-3xs">
            <button
              onClick={startCreateProduct}
              className="bg-primary hover:bg-primary-light text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center space-x-1 shadow-md"
            >
              <Plus size={14} className="text-secondary" />
              <span>Create New product</span>
            </button>
            <div className="flex gap-2 w-full sm:w-auto flex-col sm:flex-row">
              <input
                type="text"
                className="bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-1.5 text-xs font-semibold focus:outline-none"
                placeholder="Lookup in local store..."
                value={prodSearch}
                onChange={(e) => setProdSearch(e.target.value)}
              />
              <select
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-bold text-gray-500"
                value={prodCategoryFilter}
                onChange={(e) => setProdCategoryFilter(e.target.value)}
              >
                <option value="all">All Category divisions</option>
                <option value="dairy">Dairy Department</option>
                <option value="sweets">Artisanal Sweets</option>
                <option value="agro">Agro & Beef</option>
              </select>
            </div>
          </div>

          {isCreatingProduct && (
            <div className="bg-white rounded-2xl border border-secondary/25 p-6 shadow-md">
              <form onSubmit={handleProductSubmit} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-semibold">
                  <div>
                    <label className="block text-4xs font-bold text-gray-400 mb-1">PRODUCT TITLE</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:bg-white"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-4xs font-bold text-gray-400 mb-1">PRICE (BDT)</label>
                      <input
                        type="number"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5"
                        value={formPrice}
                        onChange={(e) => setFormPrice(Number(e.target.value))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-4xs font-bold text-gray-400 mb-1">STOCK CAPACITY</label>
                      <input
                        type="number"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5"
                        value={formStock}
                        onChange={(e) => setFormStock(Number(e.target.value))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-4xs font-bold text-gray-400 mb-1">UNIT SYMBOL</label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5"
                        value={formUnit}
                        onChange={(e) => setFormUnit(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-semibold">
                  <div>
                    <label className="block text-4xs font-bold text-gray-400 mb-1">CATEGORY ASSIGNMENT</label>
                    <select
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                    >
                      <option value="dairy">Dairy Department</option>
                      <option value="sweets">Artisanal Sweets</option>
                      <option value="agro">Agro & Red Beef</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-4xs font-bold text-gray-400 mb-1">IMAGE URL</label>
                    <input
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      id="sub-feat-toggle"
                      type="checkbox"
                      className="h-4 w-4 border-gray-300 rounded"
                      checked={formIsFeatured}
                      onChange={(e) => setFormIsFeatured(e.target.checked)}
                    />
                    <label htmlFor="sub-feat-toggle" className="text-2xs font-bold text-primary select-none cursor-pointer">
                      Featured highlights
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-4xs font-bold text-gray-400 mb-1">NARRATIVE DESCRIPTION</label>
                  <textarea
                    rows={2}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5"
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingProduct(false);
                      setEditingProdId(null);
                    }}
                    className="px-4 py-2 border rounded-xl"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-primary text-white rounded-xl font-bold"
                  >
                    Save Portfolio Item
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-150 shadow-3xs overflow-hidden">
            <table className="w-full text-left font-semibold text-gray-500">
              <thead className="bg-gray-50 text-gray-700 text-3xs font-extrabold uppercase">
                <tr>
                  <th className="py-3 px-6">PRODUCT</th>
                  <th className="py-3 px-3">CATEGORY</th>
                  <th className="py-3 px-3">PRICE</th>
                  <th className="py-3 px-3">STOCK LEVEL</th>
                  <th className="py-3 px-6 text-right">CONTROLS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-55/50">
                    <td className="py-3 px-6 flex items-center space-x-3">
                      <img src={p.imageUrl} className="w-8 h-8 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <span className="font-extrabold text-gray-800 text-xs block">{p.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">ID: {p.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 uppercase text-3xs bg-gray-50 text-gray-600 rounded w-fit">{p.category}</td>
                    <td className="py-3 px-3 font-bold text-primary">{p.price} BDT</td>
                    <td className="py-3 px-3 text-xs">{p.stock} units</td>
                    <td className="py-3 px-6 text-right space-x-1">
                      <button onClick={() => startEditProduct(p)} className="p-1 border rounded text-gray-500">
                        <Edit3 size={11} />
                      </button>
                      <button onClick={() => handleDeleteProduct(p.id)} className="p-1 border rounded text-red-500">
                        <Trash2 size={11} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: ORDERS HUB */}
      {activeTab === "orders" && (
        <div id="admin-orders-tab" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-5 rounded-2xl border border-gray-150 shadow-3xs gap-4">
            <input
              type="text"
              className="w-full sm:max-w-xs text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2"
              placeholder="Search Client Name or ID..."
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
            />
            <select
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-500"
              value={orderStatusFilter}
              onChange={(e) => setOrderStatusFilter(e.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending audits</option>
              <option value="processing">Processing transit</option>
              <option value="delivered">Successfully Delivered</option>
              <option value="cancelled">Cancelled records</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl border border-gray-155 shadow-3xs overflow-hidden">
            <table className="w-full text-left font-semibold text-gray-400">
              <thead className="bg-gray-50 text-gray-700 text-3xs font-extrabold uppercase">
                <tr>
                  <th className="py-3 px-6">ID</th>
                  <th className="py-3 px-4">CUSTOMER</th>
                  <th className="py-3 px-4">TRANSACTION</th>
                  <th className="py-3 px-4">TOTAL</th>
                  <th className="py-3 px-4">STATUS CARD</th>
                  <th className="py-3 px-6 text-right">EXECUTE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-55/50 text-xs">
                    <td className="py-3.5 px-6 font-mono font-bold text-primary">{ord.id}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-gray-800 block">{ord.customerName}</span>
                      <span className="text-[10px] text-gray-400">{ord.customerPhone}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-gray-500">{ord.paymentMethod} - {ord.paymentTxId}</td>
                    <td className="py-3.5 px-4 font-bold text-primary">{ord.totalAmount} BDT</td>
                    <td className="py-3.5 px-4 uppercase text-3xs font-black text-secondary-dark">{ord.status}</td>
                    <td className="py-3.5 px-6 text-right space-x-1">
                      {ord.status !== "delivered" && ord.status !== "cancelled" && (
                        <>
                          <button onClick={() => updateOrderStatus(ord.id, "processing")} className="text-3xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Ship</button>
                          <button onClick={() => updateOrderStatus(ord.id, "delivered")} className="text-3xs bg-green-50 text-green-700 px-2 py-0.5 rounded">Deliver</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: CUSTOMERS */}
      {activeTab === "customers" && (
        <div id="admin-customers-tab" className="bg-white p-6 rounded-2xl border border-gray-150 shadow-3xs space-y-4">
          <h3 className="font-display font-extrabold text-gray-800 text-sm">Customers Directory Panel</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Super Admin", email: "admin@tasnimdairy.com", phone: "+880 1712-345678", role: "Super Administrator" },
              { name: "Rashed Ahmed", email: "rashed@gmail.com", phone: "01711222333", role: "Registered Consumer client" }
            ].map((usr, i) => (
              <div key={i} className="p-4 bg-gray-50 border rounded-xl">
                <span className="font-bold text-gray-800 block">{usr.name}</span>
                <span className="text-3xs text-gray-450 block mb-2">{usr.role}</span>
                <span className="font-mono text-xs block text-gray-600 font-semibold">{usr.email} | {usr.phone}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: SITE SYSTEM CONFIGURATION */}
      {activeTab === "settings" && (
        <div id="admin-settings-tab" className="bg-white rounded-2xl border border-gray-150 shadow-3xs p-6 md:p-8">
          {setSuccessMsg && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-150 rounded-xl text-xs font-semibold">
              🌱 {setSuccessMsg}
            </div>
          )}
          <form onSubmit={handleSettingsSubmit} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-semibold">
              <div>
                <label className="block text-4xs font-bold text-gray-400 mb-1">PROMOTION BANNER TEXT</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5" value={setBanner} onChange={(e) => setSetBanner(e.target.value)} />
              </div>
              <div>
                <label className="block text-4xs font-bold text-gray-400 mb-1">TELEPHONE HOTLINE</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5" value={setPhone} onChange={(e) => setSetPhone(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-semibold">
              <div>
                <label className="block text-4xs font-bold text-gray-400 mb-1">SUPPORT MAILBOX</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5" value={setEmail} onChange={(e) => setSetEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-4xs font-bold text-gray-400 mb-1">PHYSICAL HEADQUARTERS ADDRESS</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5" value={setAddress} onChange={(e) => setSetAddress(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={isSavingSettings} className="px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-xl font-bold uppercase tracking-wider">
                {isSavingSettings ? "Synchronizing system..." : "Save Config Settings"}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useFarm } from "../../context/FarmContext";
import { useAuth } from "../../context/AuthContext";
import { paymentConfig } from "../../config/paymentConfig";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CheckCircle, Receipt, Copy } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const { createOrder } = useFarm();
  const { currentUser } = useAuth();

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">("cart");
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [txId, setTxId] = useState("");
  const [orderError, setOrderError] = useState("");
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Auto populate if user session shifts
  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.phone);
    }
  }, [currentUser]);

  if (!isCartOpen) return null;

  const activeMethod = paymentConfig.find(m => m.id === paymentMethod) || paymentConfig[0];

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError("");

    if (!name.trim()) return setOrderError("Full Name is required");
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return setOrderError("Enter a valid email address");
    if (!phone.match(/^[0-9+-\s]{11,15}$/)) return setOrderError("Enter a valid phone number (11+ digits)");
    if (!address.trim()) return setOrderError("Complete Delivery Address is required");
    if (!txId.trim()) return setOrderError("Payment Transaction ID (TxID) is required");

    try {
      const orderItems = cartItems.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      }));

      const newOrder = await createOrder({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        customerAddress: address,
        paymentMethod: activeMethod.name,
        paymentTxId: txId,
        items: orderItems,
        totalAmount: cartTotal
      });

      setCompletedOrder(newOrder);
      setCheckoutStep("success");
      clearCart();
    } catch (e: any) {
      setOrderError(e.message || "Failed to finalize checkout. Try again.");
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDrawerClose = () => {
    setIsCartOpen(false);
    if (checkoutStep === "success") {
      setCheckoutStep("cart");
      setCompletedOrder(null);
      setTxId("");
      setAddress("");
    }
  };

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Semi-transparent backdrop overlay */}
      <div
        className="absolute inset-0 bg-primary/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={handleDrawerClose}
      />

      {/* Main Drawer block */}
      <div
        id="cart-drawer-body"
        className="relative w-full max-w-lg bg-farm-cream shadow-2xl flex flex-col h-full border-l border-primary/10 transition-transform duration-300 translate-x-0"
      >
        {/* Header toolbar */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/5 rounded-full text-primary">
              <ShoppingBag size={20} className="text-secondary" />
            </div>
            <h2 className="text-lg font-display font-extrabold text-primary">
              {checkoutStep === "cart" && "Your Shopping Basket"}
              {checkoutStep === "form" && "Secure Farm Checkout"}
              {checkoutStep === "success" && "Order Confirmation"}
            </h2>
          </div>
          <button
            onClick={handleDrawerClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-all"
            aria-label="Close Cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content body split by active checkout progression */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* STEP 1: CART ITEMS PREVIEW */}
          {checkoutStep === "cart" && (
            <>
              {cartItems.length === 0 ? (
                <div id="empty-cart-state" className="h-[60%] flex flex-col justify-center items-center text-center space-y-4 px-4">
                  <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag size={28} className="text-gray-300" />
                  </div>
                  <h3 className="font-display font-bold text-gray-700">Basket is empty</h3>
                  <p className="text-sm text-gray-400 max-w-xs">
                    Browse our luxury pasture raised dairy portfolio and add premium products to your cart.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 bg-primary hover:bg-primary-light text-white text-xs font-semibold py-2.5 px-6 rounded-full transition-all"
                  >
                    Go Back to Catalog
                  </button>
                </div>
              ) : (
                <div id="cart-item-list" className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center space-x-4 bg-white p-4 rounded-xl border border-gray-100 shadow-3xs"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {item.product.price} BDT / {item.product.unit}
                        </p>
                        <p className="text-2xs font-bold text-secondary tracking-wide uppercase mt-0.5">
                          In stock: {item.product.stock}
                        </p>
                      </div>

                      {/* Quantity sliders */}
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-1.5 bg-gray-50 py-1 px-2 rounded-lg border border-gray-100">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-mono text-xs font-bold w-6 text-center text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className={`p-1 rounded-md transition-all ${
                              item.quantity >= item.product.stock 
                                ? "text-gray-200" 
                                : "text-gray-400 hover:text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="flex items-center space-x-1 text-red-400 hover:text-red-600 transition-all"
                        >
                          <Trash2 size={13} />
                          <span className="text-3xs font-semibold">Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* STEP 2: SHIPPING AND PAYMENT FORM */}
          {checkoutStep === "form" && (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-5">
              {orderError && (
                <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-xs font-medium">
                  ⚠️ {orderError}
                </div>
              )}

              {/* Information inputs */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-2xs font-bold text-gray-500 mb-1">NAME</label>
                    <input
                      type="text"
                      className="w-full text-sm bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-primary focus:outline-none"
                      placeholder="e.g. Abdullah Hasan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-2xs font-bold text-gray-500 mb-1">EMAIL</label>
                      <input
                        type="email"
                        className="w-full text-sm bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-primary focus:outline-none"
                        placeholder="e.g. abd@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-bold text-gray-500 mb-1">PHONE NUMBER</label>
                      <input
                        type="tel"
                        className="w-full text-sm bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-primary focus:outline-none"
                        placeholder="e.g. 01712xxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-2xs font-bold text-gray-500 mb-1">DELIVERY ADDRESS</label>
                    <textarea
                      rows={2}
                      className="w-full text-sm bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 focus:border-primary focus:outline-none"
                      placeholder="House, Road, Apartment, Area, Dhaka"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                  Select Mobile Pay or Bank
                </h3>
                
                <div className="grid grid-cols-3 gap-2">
                  {paymentConfig.map(method => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`py-2 px-1 text-center rounded-lg border text-xs font-semibold transition-all ${
                        paymentMethod === method.id
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-700 border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      {method.name.split(" ")[0]}
                    </button>
                  ))}
                </div>

                {/* Secure instructions card */}
                <div className="bg-white/95 p-4 rounded-xl border border-secondary/25 shadow-3xs space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-2xs font-bold text-gray-400">SEND PAYMENT TO:</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(activeMethod.accountNo.split(" ")[0])}
                      className="text-primary hover:text-secondary text-2xs font-bold flex items-center space-x-1"
                    >
                      <Copy size={11} />
                      <span>{copied ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="bg-primary/5 py-1 px-3.5 rounded text-md font-mono text-primary font-bold">
                    {activeMethod.accountNo}
                  </div>
                  <div className="text-3xs text-gray-500 leading-normal">
                    <span className="font-bold text-primary">Instructions:</span> {activeMethod.instructions}
                  </div>
                </div>

                {/* TxID entry */}
                <div>
                  <label className="block text-2xs font-extrabold text-primary mb-1 tracking-wider uppercase">
                    INPUT PAYMENT TRANSACTION ID (TxID)
                  </label>
                  <input
                    type="text"
                    className="w-full text-md font-mono bg-white border border-secondary/40 rounded-lg px-4 py-3 font-semibold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. BK9X8104YD"
                    value={txId}
                    onChange={(e) => setTxId(e.target.value)}
                    required
                  />
                  <p className="text-3xs text-gray-400 mt-1.5 leading-normal">
                    Enter the exact reference TxID code received in your mobile banking SMS. This registers instant validation in our Admin auditing system.
                  </p>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER SUCCESS RECEIPT LAYOUT */}
          {checkoutStep === "success" && completedOrder && (
            <div id="checkout-success-view" className="space-y-6 text-center py-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-100">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-display font-black text-xl text-primary">
                  Order Placed Successfully!
                </h3>
                <p className="text-xs text-gray-400">
                  Your fresh organic selection is reserved with our active dispatch.
                </p>
              </div>

              {/* Physical details ticket card */}
              <div className="bg-white rounded-xl border border-gray-100 p-5 text-left text-sm space-y-4">
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <div className="flex items-center text-primary font-semibold">
                    <Receipt size={15} className="mr-2 text-secondary" />
                    <span>Order Receipt</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full">
                    {completedOrder.id}
                  </span>
                </div>

                <div className="space-y-2 mt-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-xs">Customer Name:</span>
                    <span className="font-semibold text-gray-800">{completedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-xs">Phone Number:</span>
                    <span className="font-semibold text-gray-800">{completedOrder.customerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-xs">Payment Method:</span>
                    <span className="font-semibold text-primary">{completedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-xs text-left">Transaction ID:</span>
                    <span className="font-mono font-bold text-gray-800 break-all">{completedOrder.paymentTxId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-xs">Order Status:</span>
                    <span className="font-bold text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded uppercase">
                      {completedOrder.status}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-50 pt-3">
                  <p className="text-xs font-bold text-gray-500 mb-2">Purchased Portfolio:</p>
                  <div className="space-y-1">
                    {completedOrder.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between text-xs text-gray-600">
                        <span>{item.name} <span className="font-bold font-mono">x{item.quantity}</span></span>
                        <span>{item.price * item.quantity} BDT</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-50 pt-3 flex justify-between items-center font-bold text-primary">
                  <span>Grand Total:</span>
                  <span className="text-lg">{completedOrder.totalAmount} BDT</span>
                </div>
              </div>

              {/* Delivery notification card */}
              <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-1050 text-left">
                <p className="text-2xs font-extrabold text-secondary tracking-wider uppercase mb-1">
                  💡 Delivery Window
                </p>
                <p className="text-3xs text-gray-600 leading-relaxed">
                  Our dispatch team runs fresh farm deliveries daily between <span className="font-bold text-primary">7:00 AM - 11:30 AM</span>. Our coordinator will contact you at your phone shortly before delivery. Keep your line active!
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions panel (persistent calculations) */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t border-gray-100 p-6 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Products Count:</span>
                <span className="font-mono text-gray-700">{cartCount} items</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery Charge:</span>
                <span className="text-green-600 font-semibold uppercase text-xs">Free Promo</span>
              </div>
              <div className="flex justify-between items-center text-primary font-bold text-base pt-1">
                <span>Total Amount:</span>
                <span className="text-xl font-display">{cartTotal} BDT</span>
              </div>
            </div>

            {checkoutStep === "cart" && (
              <button
                id="cart-btn-checkout"
                onClick={() => setCheckoutStep("form")}
                className="w-full bg-primary hover:bg-primary-light text-white font-display font-semibold py-4 rounded-xl shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={16} />
              </button>
            )}

            {checkoutStep === "form" && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl text-center text-sm transition-all"
                >
                  Back to Basket
                </button>
                <button
                  type="button"
                  onClick={handleCheckoutSubmit}
                  className="bg-primary hover:bg-primary-light text-white font-semibold py-3.5 rounded-xl text-center text-sm transition-all"
                >
                  Pay & Place Order
                </button>
              </div>
            )}
          </div>
        )}

        {checkoutStep === "success" && (
          <div className="bg-white border-t border-gray-100 p-6">
            <button
              onClick={handleDrawerClose}
              className="w-full bg-primary hover:bg-primary-light text-white font-semibold py-3.5 rounded-xl text-center text-sm transition-all"
            >
              Close Receipt & Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

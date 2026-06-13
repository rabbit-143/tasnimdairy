export interface PaymentMethod {
  id: string;
  name: string;
  type: "mobile" | "bank";
  accountNo: string;
  instructions: string;
  iconPath: string;
}

export const paymentConfig: PaymentMethod[] = [
  {
    id: "bkash",
    name: "bKash",
    type: "mobile",
    accountNo: "01712-345678 (Merchant)",
    instructions: "Choose Make Payment, enter Merchant number, fill reference order number, and input pin.",
    iconPath: "/assets/payments/bkash.png"
  },
  {
    id: "nagad",
    name: "Nagad",
    type: "mobile",
    accountNo: "01712-345678 (Merchant)",
    instructions: "Choose Merchant Pay, enter Merchant number, write order reference, and enter your PIN.",
    iconPath: "/assets/payments/nagad.png"
  },
  {
    id: "rocket",
    name: "Rocket",
    type: "mobile",
    accountNo: "01712-345678-9 (Merchant)",
    instructions: "Perform Merchant Pay using Rocket app, fill in reference number and payment amount.",
    iconPath: "/assets/payments/rocket.png"
  },
  {
    id: "upay",
    name: "Upay",
    type: "mobile",
    accountNo: "01712-345678 (Merchant)",
    instructions: "Select Pay Merchant inside Upay, write reference order number, and confirm.",
    iconPath: "/assets/payments/upay.png"
  },
  {
    id: "bank",
    name: "Bank Transfer (Eastern Bank Ltd / EBL)",
    type: "bank",
    accountNo: "Tasnim Dairy Farm, A/C: 104285718392",
    instructions: "Transfer to EBL Gulshan Branch (Routing: 095260123). Put Order # as transfer note, upload receipt.",
    iconPath: "/assets/payments/bank.png"
  }
];

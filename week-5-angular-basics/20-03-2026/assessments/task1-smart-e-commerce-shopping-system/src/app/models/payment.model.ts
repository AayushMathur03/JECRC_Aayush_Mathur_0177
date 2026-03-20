export interface PaymentMethod {
  type: 'credit' | 'debit' | 'upi' | 'cod';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  upiId?: string;
}

export interface Order {
  customer: any;
  cartItems: any[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  orderDate: Date;
}

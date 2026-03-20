import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Customer, Address } from '../../models/customer.model';
import { PaymentMethod, Order } from '../../models/payment.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  // Customer Information Signals
  fullName = signal('');
  email = signal('');
  phone = signal('');
  gender = signal('');
  deliveryType = signal('standard');
  deliveryDate = signal('');
  additionalInstructions = signal('');
  acceptTerms = signal(false);
  subscribeOffers = signal(false);
  idProof = signal<File | null>(null);

  // Multiple Addresses (Dynamic Array)
  addresses = signal<Address[]>([
    {
      addressLine: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    }
  ]);

  // Payment Information
  paymentType = signal<'credit' | 'debit' | 'upi' | 'cod'>('credit');

  // Multiple Payment Methods (Dynamic Array)
  paymentMethods = signal<PaymentMethod[]>([
    {
      type: 'credit',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      upiId: ''
    }
  ]);

  // Current active payment method index
  currentPaymentIndex = signal(0);

  // Dropdown options
  cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Mumbai', 'Delhi', 'Bangalore'];
  states = ['California', 'Texas', 'Florida', 'New York', 'Maharashtra', 'Karnataka', 'Tamil Nadu'];
  countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia'];

  // Validation errors
  emailError = computed(() => {
    const emailValue = this.email();
    if (!emailValue) return '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue) ? '' : 'Invalid email format';
  });

  phoneError = computed(() => {
    const phoneValue = this.phone();
    if (!phoneValue) return '';
    return phoneValue.length >= 10 ? '' : 'Phone must be at least 10 digits';
  });

  isFormValid = computed(() => {
    return (
      this.fullName() &&
      this.email() &&
      !this.emailError() &&
      this.phone() &&
      !this.phoneError() &&
      this.gender() &&
      this.deliveryDate() &&
      this.acceptTerms() &&
      this.addresses()[0].addressLine &&
      this.addresses()[0].city &&
      this.addresses()[0].state &&
      this.addresses()[0].country &&
      this.addresses()[0].zipCode
    );
  });

  constructor(public cartService: CartService) {
    // Set minimum delivery date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.deliveryDate.set(tomorrow.toISOString().split('T')[0]);
  }

  cartItems = computed(() => this.cartService.cartItems());
  cartTotal = computed(() => this.cartService.cartTotal());

  // Address Management
  addAddress() {
    this.addresses.update(addrs => [
      ...addrs,
      {
        addressLine: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
      }
    ]);
  }

  removeAddress(index: number) {
    if (this.addresses().length > 1) {
      this.addresses.update(addrs => addrs.filter((_, i) => i !== index));
    }
  }

  updateAddress(index: number, field: keyof Address, value: string) {
    this.addresses.update(addrs => {
      const updated = [...addrs];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  // Payment Method Management
  addPaymentMethod() {
    this.paymentMethods.update(methods => [
      ...methods,
      {
        type: this.paymentType(),
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        upiId: ''
      }
    ]);
    this.currentPaymentIndex.set(this.paymentMethods().length - 1);
  }

  removePaymentMethod(index: number) {
    if (this.paymentMethods().length > 1) {
      this.paymentMethods.update(methods => methods.filter((_, i) => i !== index));
      if (this.currentPaymentIndex() >= this.paymentMethods().length) {
        this.currentPaymentIndex.set(this.paymentMethods().length - 1);
      }
    }
  }

  updatePaymentMethod(index: number, field: string, value: string) {
    this.paymentMethods.update(methods => {
      const updated = [...methods];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  switchPaymentMethod(index: number) {
    this.currentPaymentIndex.set(index);
  }

  onPaymentTypeChange(type: 'credit' | 'debit' | 'upi' | 'cod') {
    this.paymentType.set(type);
    const currentIndex = this.currentPaymentIndex();
    this.paymentMethods.update(methods => {
      const updated = [...methods];
      updated[currentIndex] = {
        ...updated[currentIndex],
        type: type,
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        upiId: ''
      };
      return updated;
    });
  }

  // File Upload
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.idProof.set(input.files[0]);
    }
  }

  // Form Submission
  placeOrder() {
    if (!this.isFormValid()) {
      alert('Please fill all required fields correctly!');
      return;
    }

    const customer: Customer = {
      fullName: this.fullName(),
      email: this.email(),
      phone: this.phone(),
      gender: this.gender(),
      addresses: this.addresses(),
      deliveryType: this.deliveryType(),
      deliveryDate: this.deliveryDate(),
      additionalInstructions: this.additionalInstructions(),
      acceptTerms: this.acceptTerms(),
      subscribeOffers: this.subscribeOffers(),
      idProof: this.idProof()
    };

    const order: Order = {
      customer,
      cartItems: this.cartItems(),
      totalAmount: this.cartTotal() * 1.1,
      paymentMethod: this.paymentMethods()[this.currentPaymentIndex()],
      orderDate: new Date()
    };

    console.log('Order Placed:', order);
    alert(`Order placed successfully!\n\nOrder Total: $${order.totalAmount.toFixed(2)}\nDelivery Date: ${this.deliveryDate()}\n\nThank you for shopping with us!`);

    // Clear cart after successful order
    this.cartService.clearCart();
    this.resetForm();
  }

  resetForm() {
    this.fullName.set('');
    this.email.set('');
    this.phone.set('');
    this.gender.set('');
    this.deliveryType.set('standard');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.deliveryDate.set(tomorrow.toISOString().split('T')[0]);
    this.additionalInstructions.set('');
    this.acceptTerms.set(false);
    this.subscribeOffers.set(false);
    this.idProof.set(null);
    this.addresses.set([
      {
        addressLine: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
      }
    ]);
    this.paymentMethods.set([
      {
        type: 'credit',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        upiId: ''
      }
    ]);
  }
}

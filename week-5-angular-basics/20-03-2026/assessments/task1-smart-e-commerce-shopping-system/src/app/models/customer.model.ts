export interface Address {
  addressLine: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Customer {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  addresses: Address[];
  deliveryType: string;
  deliveryDate: string;
  additionalInstructions: string;
  acceptTerms: boolean;
  subscribeOffers: boolean;
  idProof?: File | null;
}

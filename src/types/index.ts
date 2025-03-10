
export interface Dealer {
  id: string;
  name: string;
  email: string;
  contact: string;
  location: string;
  createdAt: string;
}

export interface Crop {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  description?: string;
  dealerId: string;
  createdAt: string;
}

export interface DealerWithCrops extends Dealer {
  crops: Crop[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
  isDealer: boolean;
}

export type CropOption = {
  value: string;
  label: string;
};

export const CROP_OPTIONS: CropOption[] = [
  { value: 'rice', label: 'Rice' },
  { value: 'wheat', label: 'Wheat' },
  { value: 'corn', label: 'Corn' },
  { value: 'cotton', label: 'Cotton' },
  { value: 'sugarcane', label: 'Sugarcane' },
  { value: 'soybean', label: 'Soybean' },
  { value: 'potato', label: 'Potato' },
  { value: 'tomato', label: 'Tomato' },
  { value: 'onion', label: 'Onion' },
  { value: 'tea', label: 'Tea' },
];

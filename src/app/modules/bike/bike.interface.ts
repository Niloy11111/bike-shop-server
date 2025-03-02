export interface IBike {
  name: string;
  brand: string;
  model: string;
  price: number;
  photoURL: string;
  category: 'Mountain' | 'Road' | 'Folding' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
}

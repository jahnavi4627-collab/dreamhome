export interface Material {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  supplierId: string;
  category: string;
  imageUrlId: string;
  specifications: { [key: string]: string };
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  rating: number;
}

export interface CartItem extends Material {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  supplierId: string;
  orderDate: any; // Firebase Timestamp
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingAddress: string;
}

export interface OrderItem {
  id: string;
  materialId: string;
  name: string;
  quantity: number;
  price: number;
  imageUrlId: string;
}

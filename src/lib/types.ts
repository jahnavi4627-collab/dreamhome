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

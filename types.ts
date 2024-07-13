export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  slug: string;
  description: string;
  price: string;
  isFeatured: boolean;
  sizes: ProductSize[];
  color: Color;
  images: Image[];
  stocks: Stock[];
  timestamp?: number;
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
}

export interface Stock {
  id: string;
  productId: string;
  sizeId: string;
  quantity: number;
}

export interface ProductSize {
  id: string;
  productId: string;
  sizeId: string;
  size: Size;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface Wishlist {
  id: string;
  productId: string;
  userId: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: Size;
  total: number;
}

export interface Order {
  id: string;
  orderItems: OrderItem[];
  isPaid: boolean;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalAmount: number;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  quantity: number;
  size: string;
  order: Order;
  orderId: string;
  product: Product;
  productId: string;
}

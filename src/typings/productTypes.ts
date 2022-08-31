export type Product = {
  id: string;
  title: string;
  category: string;
  price: number | string;
  description: string;
  image: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartItemVariant = 'cart' | 'favourites' | 'list' | 'header' | 'orders';

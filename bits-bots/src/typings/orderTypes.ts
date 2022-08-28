import type { User } from './userTypes';
import type { CartItem } from './productTypes';

export type Order = {
  addressInfo: {
    address: string;
    name: string;
    phone: number;
    pincode: number;
  };
  cartItems: CartItem[];
  userid: User['uid'];
  email: User['email'];
};

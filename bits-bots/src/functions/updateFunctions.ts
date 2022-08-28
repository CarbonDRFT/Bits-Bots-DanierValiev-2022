import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

import fireDB from '../firebase/config';

import type { CartItem, Product } from '../typings/productTypes';
import type { User } from '../typings/userTypes';
import type { Order } from '../typings/orderTypes';

export const addProduct = async (product: Product) => {
  try {
    await addDoc(collection(fireDB, 'products'), {
      title: product.title,
      category: product.category,
      description: product.description,
      image: product.image,
      price: product.price,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (product: Product) => {
  try {
    await setDoc(doc(fireDB, 'products', product.id), product);
  } catch (error) {
    console.log(error);
  }
};

export const removeProduct = async (product: Product) => {
  try {
    await deleteDoc(doc(fireDB, 'products', product.id));
  } catch (error) {
    console.log(error);
  }
}

export const addOrder = async (adressInfo: Order['addressInfo'], cartItems: CartItem[], user: User) => {
  console.log(user);
  const addressInfo: Order['addressInfo'] = {
    name: adressInfo.name,
    address: adressInfo.address,
    pincode: adressInfo.pincode,
    phone: adressInfo.phone,
  };

  const orderInfo = {
    cartItems,
    addressInfo,
    email: user.email,
    userid: user.uid,
  };

  try {
    const result = await addDoc(collection(fireDB, 'orders'), orderInfo);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

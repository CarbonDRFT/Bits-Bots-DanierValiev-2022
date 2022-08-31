import { getDocs, getDoc, collection, doc } from 'firebase/firestore';

import fireDB from '../firebase/config';

import type { Product } from '../typings/productTypes';
import type { User } from '../typings/userTypes';
import type { Order } from '../typings/orderTypes';

export const fetchProductData = async (): Promise<Product[]> => {
  try {
    const products = await getDocs(collection(fireDB, 'products'));
    const formattedProducts: Product[] = [];

    products.forEach(product => {
      const obj = {
        id: product.id,
        title: product.data()?.title ?? 'N/A',
        category: product.data()?.category ?? 'N/A',
        price: Number(product.data()?.price) ?? 0,
        description: product.data()?.description ?? 'N/A',
        image: product.data()?.image ?? '',
        ...product.data(),
      };
      formattedProducts.push(obj);
    });

    return formattedProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const fetchProductInfo = async (id: string) => {
  try {
    const product = await getDoc(
      doc(fireDB, 'products', id)
    );
    return {
      id: product.id,
      title: product.data()?.title ?? 'N/A',
      category: product.data()?.category ?? 'N/A',
      price: Number(product.data()?.price) ?? 0,
      description: product.data()?.description ?? 'N/A',
      image: product.data()?.image ?? '',
      ...product.data(),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const fetchAllOrders = async (): Promise<Order[]> => {
  try {
    const ordersData = await getDocs(collection(fireDB, 'orders'));
      const orders: Order[] = [];
      ordersData.forEach(order => {
        orders.push(order.data() as Order);
      })
      return orders;
    } catch (error) {
      console.log(error);
      return [];
    }
}

export const fetchOrdersForUser = async (uid: User['uid']): Promise<Order[]> => {
  try {
    const ordersData = await getDocs(collection(fireDB, 'orders'));
      const orders: Order[] = [];
      ordersData.forEach(order => {
        orders.push(order.data() as Order);
      })
      const filteredOrders: Order[] = orders.filter(
        order => order.userid === uid
      );
      return filteredOrders;
    } catch (error) {
      console.log(error);
      return [];
    }
}

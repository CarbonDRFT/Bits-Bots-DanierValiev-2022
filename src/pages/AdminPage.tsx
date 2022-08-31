import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import DefaultLayout from '../layouts/DefaultLayout';
import ContentWrapper from '../components/elements/ContentWrapper';
import Button from '../components/elements/Button';
import AddModal from '../components/blocks/AddModal';
import EditModal from '../components/blocks/EditModal';
import Loader from '../components/elements/Loader';
import OrderBox from '../components/blocks/OrderBox';
import CartItems from '../components/blocks/CartItems';
import Icon from '../components/elements/Icon';
import { addProduct, updateProduct } from '../functions/updateFunctions';
import { fetchProductData, fetchAllOrders } from '../functions/fetchFunctions';
import { toggleAddModal } from '../redux/slices/uiSlice';

import type { RootState } from '../redux/store';
import type { Product } from '../typings/productTypes';
import type { Order } from '../typings/orderTypes';

type AdminSubpage = 'products' | 'orders';

const AdminPage = (): JSX.Element => {
  const [currentItem, setCurrentItem] = useState<AdminSubpage>('products')
  const [productData, setProductData] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState<boolean>(true);
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState<boolean>(true);
  const { isAddModalOpen, isEditModalOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const handleAddProduct = (product: Product) => {
    addProduct(product).then(() => {
      setProductData([...productData, product]);
      toast.success(`Successfuly added ${product.title}.`);
    });
  }

  const handleUpdateProduct = (product: Product) => {
    updateProduct(product).then(() => setProductData(productData.map(
      checkedProduct =>
      checkedProduct.id === product.id ? product : checkedProduct
    )));
    toast.success(`Successfuly updated ${product.title}.`);
  }

  useEffect(() => {
    fetchProductData().then(data => {
      setProductData(data);
      setIsProductsLoading(false);
    });

    fetchAllOrders().then(
      data => {
        setOrdersData(data);
        setIsOrdersLoading(false);
      }
    );
    // eslint-disable-next-line
  }, []);

  return (
    <DefaultLayout>
      <ContentWrapper>
        <div className="buttons-wrapper" style={{
          display: 'flex',
          gap: '1.2rem',
          marginBottom: '2.4rem',
        }}>
          <Button
            text="Products"
            variant={currentItem === 'products' ? 'primary' : undefined}
            onClick={() => setCurrentItem('products')}  
          />
          <Button
            text="Orders"
            variant={currentItem === 'orders' ? 'primary' : undefined}
            onClick={() => setCurrentItem('orders')}  
          />
        </div>
        {currentItem === 'products' ? (
          <>
            <div className="title-wrapper" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2.4rem',
            }}>
              <h1>Products</h1>
              <Button
                text="Add a product"
                variant="blue-primary"
                handler={() => dispatch(toggleAddModal())}
              />
            </div>
            <AddModal
              open={isAddModalOpen}
              addHandler={handleAddProduct}
            />
            <EditModal
              open={isEditModalOpen}
              updateHandler={handleUpdateProduct}
            />
            {!isProductsLoading ? (
              <CartItems items={productData.map(product => { return { product, quantity: 1 }})} variant="list" fallbackComponent={
                <div className="cart-items__empty-wrap">
                  <Icon name="circle-xmark" type="fas" />
                  <p className="cart-items__empty-label">You haven't added any products yet..</p>
                </div>
              } />
            ) : (
            <div className="loader-wrap">
              <Loader />
            </div>
          )}</>
        ) : null}
        {currentItem === 'orders' ? (
          <>
            <h1>Orders</h1>
            {!isOrdersLoading ? (
              ordersData.map(
                (order, index) => (
                  <OrderBox key={index} order={order} extraData />
                )
              )
            ) : (
              <div className="loader-wrap">
                <Loader />
              </div>
            )}
          </>
        ) : null}
      </ContentWrapper>
    </DefaultLayout>
  );
}

export default AdminPage;

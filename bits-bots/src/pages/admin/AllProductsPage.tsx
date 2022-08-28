import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import DefaultLayout from '../../layouts/DefaultLayout';
import ContentWrapper from '../../components/elements/ContentWrapper';
import AddModal from '../../components/blocks/AddModal';
import EditModal from '../../components/blocks/EditModal';
import Button from '../../components/elements/Button';
import CartItems from '../../components/blocks/CartItems';
import Loader from '../../components/elements/Loader';
import Icon from '../../components/elements/Icon';
import { addProduct, updateProduct } from '../../functions/updateFunctions';
import { fetchProductData } from '../../functions/fetchFunctions';
import { toggleAddModal } from '../../redux/slices/uiSlice';

import type { RootState } from '../../redux/store';
import type { Product } from '../../typings/productTypes';

const AllProductsPage = (): JSX.Element => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState<boolean>(true);
  const { isAddModalOpen, isEditModalOpen } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const handleAdd = (product: Product) => {
    addProduct(product).then(() => {
      setProductData([...productData, product]);
      toast.success(`Successfuly added ${product.title}.`);
    });
  }

  const handleUpdate = (product: Product) => {
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
  }, []);

  return (
    <DefaultLayout>
      <ContentWrapper>
        <div className="title-wrapper" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.4rem',
        }}>
          <h1>All Products</h1>
          <Button
            text="Add a product"
            variant="primary"
            handler={() => dispatch(toggleAddModal())}
          />
        </div>
        <AddModal
          open={isAddModalOpen}
          addHandler={handleAdd}
        />
        <EditModal
          open={isEditModalOpen}
          updateHandler={handleUpdate}
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
        )}
      </ContentWrapper>
    </DefaultLayout>
  );
}

export default AllProductsPage;

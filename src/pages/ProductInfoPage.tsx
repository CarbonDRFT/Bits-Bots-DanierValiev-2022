import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import DefaultLayout from '../layouts/DefaultLayout';
import ContentWrapper from '../components/elements/ContentWrapper';
import Loader from '../components/elements/Loader';
import Button from '../components/elements/Button';
import Icon from '../components/elements/Icon';
import Collection from '../components/elements/Collection';
import ProductBox from '../components/blocks/ProductBox';
import {
  fetchProductData,
  fetchProductInfo,
} from '../functions/fetchFunctions';
import {
  addProductToCart,
  toggleProductInFavourites,
} from '../redux/slices/shoppingSlice';

import type { RootState } from '../redux/store';
import type { Product } from '../typings/productTypes';

import '../styles/product.scss';

const ProductInfoPage = (): JSX.Element => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const [similarItems, setSimilarItems] = useState<Product[] | null>(null);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(true);
  const { favourites } = useSelector((state: RootState) => state.shopping);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleAddToCart = () => {
    productInfo && dispatch(addProductToCart(productInfo));
    productInfo && toast.success(`Added ${productInfo.title} to the cart.`);
  };

  const handleAddToFavourites = () => {
    productInfo && dispatch(toggleProductInFavourites(productInfo.id));
    if (productInfo) {
      if (!isLiked) {
        toast.success(
          `Successfully added ${productInfo.title} to the favourites.`
        );
      } else {
        toast.success(
          `Successfully removed ${productInfo.title} from the favourites.`
        );
      }
    }
  };

  useEffect(() => {
    fetchProductInfo(params.id ?? '').then((data) => {
      setProductInfo(data);
      setIsProductLoading(false);
    });
    fetchProductData().then((data) => {
      setProductData(data);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSimilarItems(
      productData
        .filter(
          (product) =>
            product.category === productInfo?.category &&
            product.id !== productInfo?.id
        )
        .map((item) => {
          return {
            ...item,
            sort: Math.random(),
          };
        })
        .sort((a, b) => a.sort - b.sort)
        .slice(0, 4)
    );
    // eslint-disable-next-line
  }, [productInfo]);

  const isLiked = productInfo && favourites.includes(productInfo.id);

  return (
    <DefaultLayout>
      <ContentWrapper maxWidth="1280px">
        {!isProductLoading && productInfo ? (
          <div className="two-columns">
            <img
              src={productInfo.image}
              alt={productInfo.title}
              className="two-columns__image"
            />
            <div className="two-columns__content">
              <h2 className="two-columns__title">{productInfo.title}</h2>
              <p className="two-columns__description">
                {productInfo.description}
              </p>
              <p className="two-columns__price">
                <b>{productInfo.price} kr.</b>
              </p>
              <div className="two-columns__buttons">
                <Button
                  text="Go back"
                  variant="blue"
                  handler={() => navigate('/')}
                />
                <Button
                  text="Add to cart"
                  variant="blue-primary"
                  handler={handleAddToCart}
                />
                <div
                  className={`product-box__like-icon ${
                    isLiked ? 'product-box__like-icon--liked' : ''
                  }`}
                  onClick={handleAddToFavourites}
                >
                  <Icon name="heart" type="fas" />
                </div>
              </div>
            </div>
          </div>
        ) : isProductLoading ? (
          <div className="loader-wrap">
            <Loader />
          </div>
        ) : null}
        {!isProductLoading && similarItems && similarItems.length > 0 ? (
          <div className="similar-items">
            <h2 className="similar-items__title">Similar Items</h2>
            <Collection columnSize="24rem">
              {productData.length > 0
                ? similarItems.map((item) => (
                    <ProductBox
                      key={item.id}
                      product={item}
                      isLiked={favourites.includes(item.id)}
                    />
                  ))
                : null}
            </Collection>
          </div>
        ) : null}
      </ContentWrapper>
    </DefaultLayout>
  );
};

export default ProductInfoPage;

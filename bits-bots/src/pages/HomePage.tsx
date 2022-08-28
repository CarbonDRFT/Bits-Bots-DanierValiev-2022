import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import ContentWrapper from '../components/elements/ContentWrapper';
import CategoryBoxes from '../components/elements/CategoryBoxes';
import Collection from '../components/elements/Collection';
import ProductBox from '../components/blocks/ProductBox';
import Loader from '../components/elements/Loader';
import { fetchProductData } from '../functions/fetchFunctions';

import type { ChangeEvent } from 'react';

import type { RootState } from '../redux/store';
import type { Product } from '../typings/productTypes';

const HomePage = (): JSX.Element => {
  const [searchText, setSearchText] = useState<string>('');
  const [productData, setProductData] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState<boolean>(true);
  const { favourites } = useSelector((state: RootState) => state.shopping);
  const { activeCategories } = useSelector((state: RootState) => state.ui);
  const { page } = useParams();
  const currentPage: number = page ? parseInt(page) : 1;

  useEffect(() => {
    fetchProductData().then(data => {
      setProductData(data);
      setIsProductsLoading(false);
    });
  }, []);

  const categoryData: Product['category'][] = productData.map(
    product =>
    product.category
  ).filter(
    (category, index, array) =>
    array.indexOf(category) === index
  );

  let filteredProducts: Product[] = searchText.length > 0
    ? productData.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()))
    : productData;
  if (activeCategories.length > 0) {
    filteredProducts = filteredProducts.filter(
      product =>
      activeCategories.includes(product.category)
    );
  }

  return (
    <DefaultLayout>
      <ContentWrapper>
        <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)} />
        <CategoryBoxes categories={categoryData} />
        {!isProductsLoading ? (
          <Collection
            columnSize="24rem"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.slice((currentPage - 1) * 20, (currentPage - 1) * 20 + 20).map(
                product => <ProductBox key={product.id} product={product} isLiked={favourites.includes(product.id)} />
              )
            ) : null}
          </Collection>
        ) : (
          <div className="loader-wrap">
            <Loader />
          </div>
        )}
      </ContentWrapper>
    </DefaultLayout>
  );
}

export default HomePage;

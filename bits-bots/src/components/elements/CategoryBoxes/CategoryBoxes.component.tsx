import { useSelector, useDispatch } from 'react-redux';

import { toggleCategoryActive } from '../../../redux/slices/uiSlice';

import type { RootState } from '../../../redux/store';
import type { Product } from '../../../typings/productTypes';

import './CategoryBoxes.style.scss';

const getFormattedText = (categoryName: string) => {
  switch (categoryName) {
    case 'ps4g':
      return 'PS4 Game';

    case 'ps5g':
      return 'PS5 Game';

    case 'console':
      return 'Console'

    default:
      return categoryName;
  }
}

type Props = {
  categories: Product['category'][];
}

const CategoryBoxes = ({ categories }: Props): JSX.Element => {
  const { activeCategories } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  return (
    <div className="category-boxes">
      {categories.map(
        (category, index) =>
        <div
          key={index}
          className={`category-boxes__box ${activeCategories && activeCategories.includes(category) ? 'category-boxes__box--active' : ''}`}
          onClick={() => dispatch(toggleCategoryActive(category))}
        >
          {getFormattedText(category)}
        </div>
      )}
    </div>
  );
}

export default CategoryBoxes;
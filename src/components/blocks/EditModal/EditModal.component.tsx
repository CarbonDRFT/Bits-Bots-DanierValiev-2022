import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

import Input from '../../elements/Input';
import Button from '../../elements/Button';
import { toggleEditModalOpen } from '../../../redux/slices/uiSlice';

import type { FormEvent, ChangeEvent } from 'react';

import type { RootState } from '../../../redux/store';
import type { Product } from '../../../typings/productTypes';

type Props = {
  open?: boolean;
  initialData?: Product;
  updateHandler?: (product: Product) => any;
};

const EditModal = ({ open = false, updateHandler }: Props): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const { darkThemeEnabled, currentEditedItem } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(toggleEditModalOpen());
    currentEditedItem && updateHandler && updateHandler({
      id: currentEditedItem.id,
      title: name,
      price: parseInt(price),
      image,
      description,
      category,
    });
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (currentEditedItem) {
      setName(currentEditedItem.title);
      setPrice(String(currentEditedItem.price));
      setImage(currentEditedItem.image);
      setDescription(currentEditedItem.description);
      setCategory(currentEditedItem.category);
    }
  }, [currentEditedItem]);

  return (
    <Modal
      isOpen={open}
      ariaHideApp={false}
      className="products-modal__content"
      overlayClassName={`products-modal ${darkThemeEnabled ? 'dark-theme' : ''}`}
    >
      <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
        <Input
          label="Product name"
          name="productname"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          defaultValue={currentEditedItem?.title}
          required
        />
        <Input
          label="Product price"
          name="product-price"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
          type="number"
          defaultValue={currentEditedItem?.price}
          required
        />
        <Input
          label="Product image URL"
          name="product-image"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.value)}
          defaultValue={currentEditedItem?.image}
          required
        />
        <Input
          label="Product description"
          name="product-description"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          autoComplete="false"
          defaultValue={currentEditedItem?.description}
          required
        />
        <Input
          label="Product category"
          name="product-category"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
          defaultValue={currentEditedItem?.category}
          required
        />
        <div className="products-modal__buttons">
          <Button
            text="Edit"
            variant="blue-primary"
            handler={updateHandler ? handleUpdate : undefined}
            type="button"
          />
          <Button
            text="Close"
            handler={() => dispatch(toggleEditModalOpen())}
            type="button"
          />
        </div>
      </form>
    </Modal>
  );
}

export default EditModal;

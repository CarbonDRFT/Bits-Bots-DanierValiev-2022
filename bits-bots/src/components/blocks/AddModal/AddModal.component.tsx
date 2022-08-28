import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';

import Input from '../../elements/Input';
import Button from '../../elements/Button';
import { toggleAddModal } from '../../../redux/slices/uiSlice';

import type { FormEvent, ChangeEvent } from 'react';

import type { RootState } from '../../../redux/store';
import type { Product } from '../../../typings/productTypes';

type Props = {
  open?: boolean;
  addHandler?: (product: Product) => any;
};

const AddModal = ({ open = false, addHandler }: Props): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const { darkThemeEnabled } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const handleAdd = (product: Product) => {
    dispatch(toggleAddModal());
    addHandler && addHandler({
      id: '',
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
          required
        />
        <Input
          label="Product price"
          name="product-price"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
          type="number"
          required
        />
        <Input
          label="Product image URL"
          name="product-image"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.value)}
          required
        />
        <Input
          label="Product description"
          name="product-description"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          autoComplete="false"
          required
        />
        <Input
          label="Product category"
          name="product-category"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
          required
        />
        <div className="products-modal__buttons">
          <Button
            text="Add"
            variant="blue-primary"
            handler={addHandler ? handleAdd : undefined}
            type="button"
          />
          <Button
            text="Close"
            handler={() => dispatch(toggleAddModal())}
            type="button"
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddModal;

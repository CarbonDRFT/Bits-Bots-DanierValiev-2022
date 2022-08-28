import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Product } from '../../typings/productTypes';

interface InitialState {
  darkThemeEnabled: boolean;
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  activeCategories: Product['category'][];
  currentEditedItem: Product | null;
}

const INITIAL_STATE: InitialState = {
  darkThemeEnabled: false,
  isAddModalOpen: false,
  isEditModalOpen: false,
  activeCategories: [],
  currentEditedItem: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: INITIAL_STATE,
  reducers: {
    toggleDarkTheme: (state) => {
      state.darkThemeEnabled = !state.darkThemeEnabled;
    },
    toggleAddModal: (state) => {
      state.isAddModalOpen = !state.isAddModalOpen;
    },
    toggleEditModalOpen: (state) => {
      state.isEditModalOpen = !state.isEditModalOpen;
    },
    toggleCategoryActive: (state, action: PayloadAction<Product['category']>) => {
      state.activeCategories.includes(action.payload)
        ? state.activeCategories.splice(state.activeCategories.indexOf(action.payload), 1)
        : state.activeCategories.push(action.payload);
    },
    setCurrentEditedItem: (state, action: PayloadAction<Product>) => {
      state.currentEditedItem = action.payload;
    },
  },
});

export const {
  toggleDarkTheme,
  toggleAddModal,
  toggleEditModalOpen,
  toggleCategoryActive,
  setCurrentEditedItem,
} = uiSlice.actions;
export default uiSlice.reducer;

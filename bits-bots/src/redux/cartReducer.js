const initialState = {
  cartItems: ["item1"],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add_to_cart": {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    }
    case "Delete_from_cart": {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (obj) => obj.id !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
};

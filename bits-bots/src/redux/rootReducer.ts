import { combineReducers } from 'redux';

import shoppingReducer from './slices/shoppingSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  shopping: shoppingReducer,
  ui: uiReducer,
});

export default rootReducer;

import { configureStore } from "@reduxjs/toolkit";
import CartRed ,{loadInitialState} from './Reducers/CarReducers'

const store = configureStore({
    reducer: {
      cart: CartRed,
      // Add other reducers here if you have any
    },
  });
  
  // Dispatch the loadInitialState action when the store is created
  store.dispatch(loadInitialState());
  
  export default store;
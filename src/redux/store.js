import { configureStore } from '@reduxjs/toolkit';
import furniture from './furnitureSlice';
import auth from './authSlice';

const store = configureStore({
  reducer: {
      furniture,
      auth
    },
})

export default store;
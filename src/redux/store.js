import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import watchlistReducer from './slices/watchlistSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    watchlist: watchlistReducer,
  },
});

export default store;

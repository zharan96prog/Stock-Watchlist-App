import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const addCompanyToWatchlist = createAsyncThunk(
  'watchlist/addCompany',
  async (company, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'watchlist'), company);
      return { id: docRef.id, ...company };
    } catch (error) {
      console.error('Firestore error:', error);
      return rejectWithValue(error.message || 'Unknown error occurred');
    }
  }
);

export const getWatchlist = createAsyncThunk(
  'watchlist/getWatchlist',
  async (_, { rejectWithValue }) => {
    try {
      const watchlistRef = collection(db, 'watchlist');
      const snapshot = await watchlistRef.get();
      const watchlist = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return watchlist;
    } catch (error) {
      console.error('Firestore error:', error);
      return rejectWithValue(error.message || 'Unknown error occurred');
    }
  }
);

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    companies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCompanyToWatchlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCompanyToWatchlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies.push(action.payload);
      })
      .addCase(addCompanyToWatchlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getWatchlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWatchlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = action.payload;
      })
      .addCase(getWatchlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default watchlistSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, navigate }, { rejectWithValue }) => {
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      const token = await userData.user.getIdToken();
      navigate('/');
      return { email: userData.user.email, token };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, navigate }, { rejectWithValue }) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await newUser.user.getIdToken();
      navigate('/');
      return { email: newUser.user.email, token };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const checkUser = createAsyncThunk('auth/check', async () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        resolve({ email: user.email, token });
      } else {
        resolve(null);
      }
    });
    return () => unsubscribe();
  });
});

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isChecking: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.email;
        state.token = payload.token;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.email;
        state.token = payload.token;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })

      // CHECK USER
      .addCase(checkUser.pending, (state) => {
        state.isChecking = true;
      })
      .addCase(checkUser.fulfilled, (state, { payload }) => {
        state.isChecking = false;
        if (payload) {
          state.user = payload.email;
          state.token = payload.token;
        } else {
          state.user = null;
          state.token = null;
        }
      })
      .addCase(checkUser.rejected, (state) => {
        state.isChecking = false;
        state.error = 'Authentication check failed';
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

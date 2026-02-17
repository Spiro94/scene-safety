import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { signUp, signIn, signOut } from '../../api/supabase';

export interface AuthState {
  user: { email: string } | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const signUpAsync = createAsyncThunk(
  'auth/signUp',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await signUp(email, password);
      return { email: data.user?.email || email };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Sign up failed');
    }
  },
);

export const signInAsync = createAsyncThunk(
  'auth/signIn',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await signIn(email, password);
      return { email: data.user?.email || email };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Sign in failed');
    }
  },
);

export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async ({}, { rejectWithValue }) => {
    try {
      await signOut();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Sign out failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Sign out
    builder
      .addCase(signOutAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Sign Up
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signUpAsync.fulfilled,
        (state, action: PayloadAction<{ email: string }>) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.error = null;
        },
      )
      .addCase(signUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Sign In
    builder
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signInAsync.fulfilled,
        (state, action: PayloadAction<{ email: string }>) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.error = null;
        },
      )
      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

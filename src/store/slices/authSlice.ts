import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { signUp, signIn, signOut, getCurrentSession } from '../../api/supabase';

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
  async (_, { rejectWithValue }) => {
    try {
      await signOut();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Sign out failed');
    }
  },
);

export const initializeAuthAsync = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const session = await getCurrentSession();
      return session?.user?.email ? { email: session.user.email } : null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Initialization failed');
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
    setAuthenticatedUser: (state, action: PayloadAction<{ email: string }>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Initialize
    builder
      .addCase(initializeAuthAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeAuthAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(initializeAuthAsync.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

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

export const { clearError, setAuthenticatedUser, clearAuthState } =
  authSlice.actions;
export default authSlice.reducer;

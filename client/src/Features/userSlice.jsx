
// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Initial state management from localStorage
const initialStateLocal = localStorage.getItem('userSliceData');
let initialState;

if (initialStateLocal && initialStateLocal !== 'undefined') {
  try {
    initialState = JSON.parse(initialStateLocal);
    if (!Array.isArray(initialState.signedUpUsers)) {
      initialState.signedUpUsers = []; // Ensure signedUpUsers is always an array
    }
  } catch (e) {
    console.error('Failed to parse userSliceData from localStorage:', e);
    initialState = {
      loginInfo: {
        username: '',
        email: '',
        password: '',
        userId: '', // Ensure userId is defined
        isSignIn: false,
        lastLogin: null,
        role: '', // Add role to initial state
      },
      signedUpUsers: [], // Initialize signedUpUsers as an empty array
      status: 'idle',
      error: null,
    };
  }
} else {
  initialState = {
    loginInfo: {
      username: '',
      email: '',
      password: '',
      userId: '', // Ensure userId is defined
      isSignIn: false,
      lastLogin: null,
      role: '', // Add role to initial state
    },
    signedUpUsers: [], // Initialize signedUpUsers as an empty array
    status: 'idle',
    error: null,
  };
}

// Async thunk for user/admin login
// export const loginUser = createAsyncThunk(
//   'user/loginUser',
//   async ({ email, password, role }, { rejectWithValue, dispatch }) => {
//     try {
//       const endpoint = role === 'admin' ? 'admin/login' : 'login';
//       const response = await axios.post(`http://localhost:8000/auth/${endpoint}`, { email, password });
//       const userData = response.data.user;
//       dispatch(setLoginData({ ...userData, role })); // Set role in login data
//       return userData;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// export const loginUser = createAsyncThunk(
//   'user/loginUser',
//   async ({ email, password, role }, { rejectWithValue, dispatch }) => {
//     try {
//       const endpoint = role === 'admin' ? 'admin/login' : 'auth/login'; // Adjust endpoint based on role
//       const response = await axios.post(`http://localhost:8000/${endpoint}`, { email, password });
//       const userData = response.data.user;
//       dispatch(setLoginData({ ...userData, role })); // Dispatch action to set login data
//       return userData;
//     } catch (error) {
//       return rejectWithValue(error.response.data); // Return error data
//     }
//   }
// );
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password, role }, { rejectWithValue, dispatch }) => {
    try {
      const endpoint = role === 'admin' ? 'admin/login' : 'auth/login';
      const response = await axios.post(`http://localhost:8000/${endpoint}`, { email, password });
      const userData = response.data.user;
      dispatch(setLoginData({ ...userData, role })); // Dispatch action to set login data
      return userData;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Login failed');
    }
  }
);

// Async thunk for user sign-up
export const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to sign up');
    }
  }
);

// // Async thunk for updating user profile
// export const updateProfile = createAsyncThunk(
//   'user/updateProfile',
//   async (formData, { rejectWithValue, getState }) => {
//     try {
//       const response = await fetch('http://localhost:8000/api/user', {
//         method: 'PUT',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }

//       const responseData = await response.json();
//       return responseData.user;
//     } catch (error) {
//       return rejectWithValue(error.message || 'Failed to update profile');
//     }
//   }
// );

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put('http://localhost:8000/api/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.entity;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to update profile');
    }
  }
);

// Async thunk for deleting user account
export const deleteAccount = createAsyncThunk(
  'user/deleteAccount',
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`http://localhost:8000/api/user/${userId}`);

      // Clear all user data from state and localStorage
      dispatch(clearUserData());

      toast.success('Account deleted successfully');
    } catch (error) {
      console.error('Failed to delete account:', error);
      toast.error('Failed to delete account. Please try again.');
      return rejectWithValue(error.message || 'Failed to delete account');
    }
  }
);

// Async thunk for saving billing information
export const saveBillingInfo = createAsyncThunk(
  'user/saveBillingInfo',
  async ({ _id, ...billingInfo }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/user/save-billing', { _id, ...billingInfo });
      toast.success('Billing information saved successfully');
      return response.data; // Assuming your backend sends back meaningful data upon successful save
    } catch (error) {
      toast.error('Error saving billing information');
      return rejectWithValue(error.response?.data?.message || 'Error saving billing information');
    }
  }
);

// Action to clear all user data
export const clearUserData = () => {
  localStorage.removeItem('userSliceData');
  return { type: 'user/clearUserData' };
};

// Define user slice with reducers
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    newSignUp: (state, { payload }) => {
      state.signedUpUsers.push(payload);
      state.loginInfo = { ...state.loginInfo, ...payload, isSignIn: true };
      localStorage.setItem('userSliceData', JSON.stringify(state));
    },
    setLoginData: (state, { payload }) => {
      state.loginInfo = { ...payload, isSignIn: true };
      localStorage.setItem('userSliceData', JSON.stringify(state));
    },
    signOut: (state) => {
      state.loginInfo = {
        username: '',
        email: '',
        password: '',
        userId: '', // Ensure userId is reset
        isSignIn: false,
        lastLogin: null,
        role: '', // Reset role on sign out
      };
      state.signedUpUsers = [];
      localStorage.removeItem('userSliceData');
    },
    updateUserData: (state, { payload }) => {
      state.loginInfo = { ...state.loginInfo, ...payload.loginInfo };
      state.signedUpUsers = payload.signedUpUsers || state.signedUpUsers;
      localStorage.setItem('userSliceData', JSON.stringify(state));
    },
    updatePassword: (state, { payload }) => {
      state.loginInfo.password = payload.password;
      localStorage.setItem('userSliceData', JSON.stringify(state));
    },
    clearError: (state) => {
      state.error = null;
    },
    clearStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loginInfo = { ...state.loginInfo, ...action.payload, isSignIn: true };
        state.loginInfo.lastLogin = action.payload.lastLogin;
        localStorage.setItem('userSliceData', JSON.stringify(state));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || 'Failed to log in';
      })
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loginInfo = { ...state.loginInfo, ...action.payload, isSignIn: true };
        state.loginInfo.lastLogin = action.payload.lastLogin;
        state.signedUpUsers.push(action.payload);
        localStorage.setItem('userSliceData', JSON.stringify(state));
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to sign up';
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loginInfo = { ...state.loginInfo, ...action.payload };
        localStorage.setItem('userSliceData', JSON.stringify(state)); // Update localStorage
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to update profile';
      })
      .addCase(deleteAccount.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.status = 'succeeded';
        state.loginInfo = {
          username: '',
          email: '',
          password: '',
          userId: '', // Ensure userId is reset
          isSignIn: false,
          lastLogin: null,
          role: '', // Reset role on delete
        };
        state.signedUpUsers = [];
        localStorage.removeItem('userSliceData');
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to delete account';
      })
      .addCase(saveBillingInfo.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(saveBillingInfo.fulfilled, (state) => {
        state.status = 'succeeded';
        // Optionally handle any specific state update after saving billing info
      })
      .addCase(saveBillingInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to save billing information';
      });
  },
});

// Export actions and reducer
export const {
  newSignUp,
  setLoginData,
  signOut,
  updateUserData,
  updatePassword,
  clearError,
  clearStatus,
} = userSlice.actions;

export default userSlice.reducer;

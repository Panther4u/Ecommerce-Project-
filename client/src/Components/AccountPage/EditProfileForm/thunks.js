import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const updateProfile = createAsyncThunk(
  'userSlice/updateProfile',
  async (updatedUserData, { getState, rejectWithValue }) => {
    try {
      const { loginInfo } = getState().userSlice;
      const response = await fetch('http://localhost:8000/api/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedUserData,
          userId: loginInfo.userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      toast.success('Profile updated successfully');
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      return rejectWithValue(error.message);
    }
  }
);

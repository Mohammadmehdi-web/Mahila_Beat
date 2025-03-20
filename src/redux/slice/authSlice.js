import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  userDetails: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // Added to handle loading state on app startup
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userDetails = action.payload.userDetails;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      AsyncStorage.setItem(
        'userDetails',
        JSON.stringify(action.payload.userDetails),
      ); // Persist user details
      AsyncStorage.setItem('token', action.payload.token); // Persist token
    },
    logout: state => {
      state.userDetails = null;
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('userDetails'); // Remove user session
      AsyncStorage.removeItem('token'); // Remove token
    },
    restoreSession: (state, action) => {
      state.userDetails = action.payload.userDetails;
      state.token = action.payload.token;
      state.isAuthenticated =
        action.payload.userDetails !== null && action.payload.token !== null;
      state.isLoading = false;
    },
  },
});

export const {loginSuccess, logout, restoreSession} = authSlice.actions;
export default authSlice.reducer;

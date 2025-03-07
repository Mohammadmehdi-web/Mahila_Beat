import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userDetails: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.userDetails = action.payload;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.userDetails = null;
      state.isAuthenticated = false;
    },
  },
});

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;

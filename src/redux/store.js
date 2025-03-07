import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import activityReducer from './slice/activitySlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    activity: activityReducer,
  },
});

export default store;

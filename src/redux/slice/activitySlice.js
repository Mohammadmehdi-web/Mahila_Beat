import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentActivityId: null,
  activities: {}, // Stores all details under Activity ID
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    createActivity: (state, action) => {
      const {activityId, bhramadDetails} = action.payload;
      console.log('bhramadDetails', bhramadDetails);
      console.log(activityId);

      state.currentActivityId = activityId;
      state.activities[activityId] = {
        bhramadDetails,
        samvadDetails: [],
        complaints: [],
      };
    },
    addSamvadDetails: (state, action) => {
      const {activityId, samvadData} = action.payload;
      if (state.activities[activityId]) {
        state.activities[activityId].samvadDetails.push(samvadData);
      }
    },
    addComplaintDetails: (state, action) => {
      const {activityId, complaintData} = action.payload;
      console.log('🚀 complaintData:', complaintData);
      console.log('📌 Data Types:');
      Object.entries(complaintData).forEach(([key, value]) => {
        console.log(`🔹 ${key}:`, value, `(${typeof value})`);
      });
      if (state.activities[activityId]) {
        state.activities[activityId].complaints.push(complaintData);
      }
    },
  },
});

export const {createActivity, addSamvadDetails, addComplaintDetails} =
  activitySlice.actions;
export default activitySlice.reducer;

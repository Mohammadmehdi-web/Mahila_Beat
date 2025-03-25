import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/homeScreen/homeScreen';
import Dashboard from '../screens/Dashboard/dashboard';
import MeriBeat from '../screens/meriBeat/meriBeat';
import DetailsScreen from '../screens/detailsScreen/detailsScreen';
import VisitDetailsScreen from '../screens/visitDetailsScreen/visitDetailsScreen';
import SamvadDetails from '../screens/samvadDetails/samvadDetails';
import ComplaintScreen from '../screens/complaintScreen/complaintScreen';
import ComplaintList from '../screens/complaintList/complaintList';
import CompletedComplaints from '../screens/completedComplains/completedComplains';
import BhramadDetails from '../screens/bhramadDetails/bhramadDetails';
import ComplaintDescription from '../screens/ComplainDescription/complaintDescription';
import AllComplaints from '../screens/allComplaints/allComplaints';
import AllVisits from '../screens/allVisits/allVisits';
import VisitInfo from '../screens/visitInfo/visitInfo';
import MyVisits from '../screens/myVisits/myVisits';
import ChangePasswordScreen from '../screens/changePass/changePass';

const Stack = createStackNavigator();

const AuthNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="MeriBeat" component={MeriBeat} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="VisitDetails" component={VisitDetailsScreen} />
      <Stack.Screen name="SamvadDetails" component={SamvadDetails} />
      <Stack.Screen name="ComplaintScreen" component={ComplaintScreen} />
      <Stack.Screen name="ComplaintList" component={ComplaintList} />
      <Stack.Screen
        name="CompletedComplaints"
        component={CompletedComplaints}
      />
      <Stack.Screen name="BhramadDetails" component={BhramadDetails} />
      <Stack.Screen
        name="ComplaintDescription"
        component={ComplaintDescription}
      />
      <Stack.Screen name="AllComplaints" component={AllComplaints} />
      <Stack.Screen name="AllVisits" component={AllVisits} />
      <Stack.Screen name="VisitInfo" component={VisitInfo} />
      <Stack.Screen name="MyVisits" component={MyVisits} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNav;

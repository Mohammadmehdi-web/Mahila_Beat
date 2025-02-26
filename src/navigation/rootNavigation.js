import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/splashScreen/splashScreen';
import Login from '../screens/login/login';
import HomeScreen from '../screens/homeScreen/homeScreen';
import Dashboard from '../screens/Dashboard/dashboard';
import MeriBeat from '../screens/meriBeat/meriBeat';
import DetailsScreen from '../screens/detailsScreen/detailsScreen';
import VisitDetailsScreen from '../screens/visitDetailsScreen/visitDetailsScreen';
import SamvadDetails from '../screens/samvadDetails/samvadDetails';
import ComplaintScreen from '../screens/complaintScreen/complaintScreen';
import ComplaintList from '../screens/complaintList/complaintList';
import CompletedComplaints from '../screens/completedComplains/completedComplains';

const Stack = createStackNavigator();

const RootNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="MeriBeat" component={MeriBeat} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="VisitDetails" component={VisitDetailsScreen} />
        <Stack.Screen name="SamvadDetails" component={SamvadDetails} />
        <Stack.Screen name="ComplaintScreen" component={ComplaintScreen} />
        <Stack.Screen name="ComplaintList" component={ComplaintList} />
        <Stack.Screen name="CompletedComplaints" component={CompletedComplaints} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNav;

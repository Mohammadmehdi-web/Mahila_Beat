import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import SplashScreen from '../screens/splashScreen/splashScreen';
import Login from '../screens/login/login';
import HomeScreen from '../screens/homeScreen/homeScreen';

const Stack = createStackNavigator();

const UnauthNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
    </Stack.Navigator>
  );
};

export default UnauthNav;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/splashScreen/splashScreen';
import Login from '../screens/login/login';
import HomeScreen from '../screens/homeScreen/homeScreen';
import AreaDetails from '../screens/AreaDetailScreen/areaDetails';

const Stack = createStackNavigator();

const RootNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AreaDetails" component={AreaDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNav;

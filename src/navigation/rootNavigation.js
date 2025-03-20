import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {restoreSession} from '../redux/slice/authSlice';

import AuthNav from './authNav';
import UnauthNav from './unauthNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';

const Stack = createStackNavigator();

const RootNav = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const loadSession = async () => {
      const storedUser = await AsyncStorage.getItem('userDetails');
      const storedToken = await AsyncStorage.getItem('token');
      dispatch(
        restoreSession({
          userDetails: storedUser ? JSON.parse(storedUser) : null,
          token: storedToken,
        }),
      );
    };
    loadSession();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#C2185B" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthNav /> : <UnauthNav />}
    </NavigationContainer>
  );
};

export default RootNav;
